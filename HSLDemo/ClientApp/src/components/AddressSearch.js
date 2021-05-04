import React, { Component } from 'react';
import { Card, Input, CardBody, CardSubtitle, Button, Toast, ToastBody, ToastHeader, Form, FormGroup, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { SearchResults } from './SearchResults';

export class AddressSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: props.address,
            searchResults: props.searchResults,
            maxResults: props.maxResults,
            showOptions: false,
            selectedLayerType: props.selectedLayerType,
            selectedResult: props.selectedResult,
        };
    }

    addressChanged = (event) => this.setState({ address: event.target.value })

    enterPressed = (event) => {
        if (event.key === 'Enter') {
            this.props.handleAddressSearch(event.target.value)
        }
    }

    showOptions = () => {
        this.setState(state => ({
            showOptions: !state.showOptions
        }));
    }

    render() {
        return (
            <div id="address-search-action-container">
                <Card>
                    <CardBody>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Address or place</CardSubtitle>
                        <Input onChange={this.addressChanged} onKeyDown={this.enterPressed} placeholder={this.props.placeholder} />

                        <br />
                        <Button color="primary" onClick={() => this.props.handleAddressSearch(this.state.address)}>Locate</Button>
                        <FontAwesomeIcon id="slider-icon" icon={faSlidersH} size="2x" pull="right" transform="down-4" title="Show/hide options menu"
                            onClick={this.showOptions} />
                    </CardBody>
                </Card>
                {this.state.showOptions &&
                    <>
                    <Card>
                        <Form id="search-options">
                            <FormGroup tag="fieldset">
                                <Label for="type">Type</Label>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="type" value="coarse,address,venue" defaultChecked={this.state.selectedLayerType === "coarse,address,venue"} onChange={(event) => this.props.handleTypeSelected(event)} />{' '}
                                    Any
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="type" value="address" defaultChecked={this.state.selectedLayerType === "address"} onChange={(event) => this.props.handleTypeSelected(event)} />{' '}
                                    Address
                                  </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="type" value="stop" defaultChecked={this.state.selectedLayerType === "stop"} onChange={(event) => this.props.handleTypeSelected(event)} />{' '}
                                    Stop
                                  </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="type" value="venue" defaultChecked={this.state.selectedLayerType === "venue"} onChange={(event) => this.props.handleTypeSelected(event)} />{' '}
                                    Venue
                                  </Label>
                                </FormGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="maxResults">Max results</Label>
                                <Input type="select" name="maxResults" defaultValue={this.state.maxResults} onChange={(event) => this.props.setMaxResults(event)}>
                                    <option value="1">1</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </Card>
                    </>
                }
                <SearchResults searchResults={this.state.searchResults} selectedResult={this.state.selectedResult} handleSelectResult={this.props.handleSelectResult}/>
                {this.props.addressSearchErrorText.length > 0 &&
                    <>
                    <br />
                    <Toast>
                        <ToastBody>
                            {this.props.addressSearchErrorText}
                        </ToastBody>
                    </Toast>
                    </>
                }
            </div>
        );
    }
}
