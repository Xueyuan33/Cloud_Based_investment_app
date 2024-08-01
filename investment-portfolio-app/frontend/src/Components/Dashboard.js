import { CssBaseline, Drawer, ThemeProvider, createTheme } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { green, teal } from '@mui/material/colors';
import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Paper } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import SyncRequest from "./SyncRequest";
import AppNavBar from './AppNavBar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InvestmentTable from './Tables/InvestmentTable';
import TotalFutureCard from './Cards/TotalFutureCard';
import TotalInvestmentCard from './Cards/TotalPortfolioCard';
import TotalStockCard from './Cards/TotalStockCard';
import TotalCDCard from './Cards/TotalCDCard';
import FuturePieChart from './Charts/FuturePieChart';
import PortfolioPieChart from './Charts/PortfolioPieChart';
import StockPieChart from './Charts/StockPieChart';
import CDPieChart from './Charts/CDPieChart';



const currentTheme = createTheme({
    palette: {
        primary: green,
        secondary: teal,
    }
});



  class SelectLabels extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.showStockChart = this.showStockChart.bind(this);
        this.showFutureChart = this.showFutureChart.bind(this);
        this.showCDChart = this.showCDChart.bind(this);
        this.state = {chartId: 0};
        this.state = {chartName: "Stock"};
      }
  
    handleChange() {
      
    };

    showStockChart() {
        this.setState({
            chartId: 0
        });
    };
    showFutureChart() {
        this.setState({
          chartId: 1
        });
    };
    showCDChart() {
        this.setState({
          chartId: 2
        });
    };
  
    render() {
        const currentChartId = this.state.chartId;
        //alert(this.state.chartId);
        let currentProduct;
        let currentChart, currentCard;
        if (currentChartId == 0) {
            // Select stock
            currentChart = <StockPieChart />;
            currentCard = <TotalStockCard />;
        } else if (currentChartId == 1) {
            // Select future
            currentChart = <FuturePieChart />;
            currentCard = <TotalFutureCard />;
        } else if (currentChartId == 2) {
            // Select CD
            currentChart = <CDPieChart />;
            currentCard = <TotalCDCard />;
        } else {
            // Select stock by default
            currentChart = <StockPieChart />;
            currentCard = <TotalStockCard />;
        }
        currentProduct = 
            <React.Fragment>
                <Grid item xs={8}>
                    {/* Pie Chart */}
                        <Paper
                            sx={{
                                p: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                height: "350px",
                            }}
                        >
                        {currentChart}
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    {/* Product Values */}
                    <Paper
                        sx={{
                            p: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            height: "350px",
                        }}
                        >
                        {currentCard}
                    </Paper>
                </Grid>;
            </React.Fragment>;

      let DropdownMenu = 
      <React.Fragment>
        <Grid item xs={12}>
      <FormControl>
          <Select
            defaultValue="Stock"
            value={this.chartName}
            onChange={this.handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="Stock" onClick={this.showStockChart}>
              Stock
            </MenuItem>
            <MenuItem value="Future" onClick={this.showFutureChart}>
                Future
            </MenuItem>
            <MenuItem value="CD" onClick={this.showCDChart}>
                CD
            </MenuItem>
          </Select>
          <FormHelperText>Choose investment product to display</FormHelperText>
        </FormControl>
        
        </Grid>
        {currentProduct}
        </React.Fragment>;

        return DropdownMenu;
    };
  }


export default function Dashboard() {
    return (
        <ThemeProvider theme = {currentTheme}>
            <AppNavBar />
            <Box dx = {{ display: "flex" }}>
                <CssBaseline />
                <Box
                    component={"main"}
                    sx={{
                        backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "flex",
                        overflow: 'auto'
                    }}>

                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
                        <Grid container item spacing={2}>
                            
                            <Grid item xs={8}>
                                {/* Portfolio Pie Chart */}
                                <Paper
                                    sx={{
                                        p: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: "350px",
                                    }}
                                    >
                                    <PortfolioPieChart />
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                {/* Portfolio Values */}
                                <Paper
                                    sx={{
                                        p: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: "350px",
                                    }}
                                    >
                                    <TotalInvestmentCard />
                                </Paper>
                            </Grid>
                            {/*Show selected investment product info */}
                            <SelectLabels />                            
                            <Grid item xs={12}>
                                {/* Portfolio Lists */}
                                <Paper
                                sx={{
                                    p: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: "flex",
                                }}
                                >
                                <InvestmentTable />
                                </Paper>
                            </Grid>
                            
                        </Grid>
                        <Grid container item spacing={2} direction="column">
                            
                            
                        </Grid>
                        </Container>

                </Box>

            </Box>
        </ThemeProvider>

    )
}