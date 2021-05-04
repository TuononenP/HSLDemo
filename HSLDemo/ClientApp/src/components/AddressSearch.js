import React, { Component } from 'react';
import { Card, Input, CardBody, CardSubtitle, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'

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
            this.props.handleAddressSearch(event.target.value);
        }
    }

    render() {
        return (
            <>
                <Card>
                    <CardBody>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Address or place</CardSubtitle>
                        <Input onChange={this.addressChanged} onKeyDown={this.enterPressed} placeholder={this.props.placeholder} />
                        <br />
                        <Button color="primary" onClick={() => this.props.handleAddressSearch(this.state.address)}>Locate</Button>
                        <FontAwesomeIcon id="slider-icon" icon={faSlidersH} size="2x" pull="right" transform="down-4" title="Show/hide options menu"
                            onClick={() => this.props.handleShowOptions()} />
                    </CardBody>
                </Card>
            </>
        );
    }
}
