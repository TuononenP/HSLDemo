import React, { Component } from 'react';
import { Card, Input, CardBody, CardTitle, CardSubtitle, Button, Toast, ToastBody, ToastHeader } from 'reactstrap';

export class AddressSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: props.address
        };
    }

    addressChanged = (event) => this.setState({ address: event.target.value })

    enterPressed = (event) => {
        if (event.key === 'Enter') {
            this.props.handleAddressSearch(event.target.value)
        }
    }

    render() {
        return (
            <div id="address-search-action-container">
                <Card>
                    <CardBody>
                        <CardTitle tag="h5"></CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Address or place</CardSubtitle>
                        <Input onChange={this.addressChanged} onKeyDown={this.enterPressed} placeholder={this.props.placeholder} />
                        <br />
                        <Button color="primary" onClick={() => this.props.handleAddressSearch(this.state.address)}>Search</Button>
                    </CardBody> 
                </Card>
                <br />
                {this.props.addressSearchError.length > 0 &&
                    <Toast>
                    <ToastHeader>
                            Error
                    </ToastHeader>
                        <ToastBody>
                        {this.props.addressSearchError}
                    </ToastBody>
                    </Toast>
                }
            </div>
        );
    }
}
