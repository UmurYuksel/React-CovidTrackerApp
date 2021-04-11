import React, { Component } from 'react';

//Create an index.js file in component and export all the components from this index file so this way I can save time by using the import below:
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from './images/image.png';

class App extends Component {

    state = {
        data: {},
        country: ''
    }

    //Using async 
    async componentDidMount() {
        const getData = await fetchData();
        this.setState({ data: getData });

    }

    handleCountryChange = async (country) => {
        if (country==='global') {
            country='';
        } 
        const getData = await fetchData(country);

        this.setState({ data: getData, country: country })
        console.log(getData)
    }

    render() {
        //Destructring.
        const { data, country } = this.state;


        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19" />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country}/>

            </div>
        );
    }
}

export default App;