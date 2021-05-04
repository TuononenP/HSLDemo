import React, { Component } from 'react';
import { Card, Input, Form, FormGroup, Label } from 'reactstrap';

export class AddressSearchOptions extends Component {

    render() {
        return (
            <>
                {this.props.showOptions &&
                    <Card>
                        <Form id="search-options">
                            <FormGroup tag="fieldset">
                                <Label for="type">Type</Label>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="radio" name="type" value="coarse,address,venue" defaultChecked={this.props.selectedLayerType === "coarse,address,venue"} onChange={(event) => this.props.handleTypeSelected(event)} />{' '}
                                Any
                                </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="radio" name="type" value="address" defaultChecked={this.props.selectedLayerType === "address"} onChange={(event) => this.props.handleTypeSelected(event)} />{' '}
                                Address
                                </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="radio" name="type" value="stop" defaultChecked={this.props.selectedLayerType === "stop"} onChange={(event) => this.props.handleTypeSelected(event)} />{' '}
                                Stop
                                </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="radio" name="type" value="venue" defaultChecked={this.props.selectedLayerType === "venue"} onChange={(event) => this.props.handleTypeSelected(event)} />{' '}
                                Venue
                                </Label>
                                </FormGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="maxResults">Max results</Label>
                                <Input type="select" name="maxResults" defaultValue={this.props.maxResults} onChange={(event) => this.props.handleSetMaxResults(event)}>
                                    <option value="1">1</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </Card>
                }
            </>
        );
    }
}
