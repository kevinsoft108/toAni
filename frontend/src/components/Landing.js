import React ,{ useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";
import { Link } from "react-router-dom";
const baseURL = process.env.REACT_APP_BASEURL || "http://localhost:5000";

class Landing extends React.Component {
    state = {
        value: '',
        data : {},
        show: false,
        error: false,
    };
    
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const zip_code = this.state.value;
        console.log(zip_code);
        axios
            .get(`${baseURL}/server/weather/${zip_code}`)
            .then(res => {
                if (res.data.error) {
                    this.setState({ error: true, show: true });
                    return;
                }
                this.setState({ data: res.data, show: true });
                
                console.log(res.data);
            })
            .catch((err) => console.log(err));
        
    }

    handleClose = e => {
        this.setState({ show: false, error: false });
    }
    render() {
        const { show, data, error } = this.state;

        return (
            <div >
                <div className="mb-5">
                    <h1 className="display-5">
                        Weather Forcast
                    </h1>
                </div>
                <div className="mb-5">
                    <p>Enter a Norwegian Zipcode below to get the current weather conditions for that area</p>
                </div>
                <div>
                    <form className="d-flex" onSubmit={this.handleSubmit}>
                        <input type="text" className="form-control mr-3"  onChange={this.handleChange} />
                        <input type="submit" className="btn btn-warning" value="Enter" />
                    </form>
                </div>
                <Modal show={show} onHide={this.handleClose} animation={false}>
                    <Modal.Body>
                        {error ?
                            <div>
                                <img className="mb-5" src='/no_location.png'/>
                                <p className="mb-5">Whoa! Looks like there was an error with your zipcode</p>
                                <button className="btn btn-danger" onClick={this.handleClose}>Try again</button>
                            </div>
                            :
                            <div>
                                {data.main ?
                                    <div>
                                        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}/>
                                        <h1>{data.main.temp}°</h1>
                                        <h3>{data.weather[0].description}</h3>
                                        <div className="row display-6 mt-5">
                                            <div className="col-md-6">
                                                <p>humidity:{data.main.humidity}%</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p>wind speed:{data.wind.speed}</p>
                                            </div>
                                        </div>
                                        <p>location:{data.sys.country}</p>  
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        }
                    </Modal.Body>
                </Modal>
            </div>

        )
    }
}

export default Landing;
