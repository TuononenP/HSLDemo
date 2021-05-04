import React, { Component } from 'react';
import { Card, CardBody, CardFooter, Button } from 'reactstrap';

export class SearchResults extends Component {

    render() {
        return (
            <>
                {this.props.showResults
                    ?
                        (this.props.searchResults.length > 0 &&
                            <>
                            <Card>
                                <CardBody>
                                    {this.props.searchResults.map((result, idx) =>
                                        <Button block key={'searchResultBtn-' + idx} outline={this.props.selectedResult !== result}
                                            color="secondary" className="searchResultButton" onClick={() => this.props.handleSelectResult(result)}>
                                            {result.label}
                                        </Button>
                                    )}
                                </CardBody>
                                <CardFooter>
                                    <Button id="hide-results" outline color="secondary" size="sm" onClick={() => this.props.handleHideResults()}>Hide results</Button>
                                </CardFooter>
                            </Card>
                            </>)
                    :
                        (this.props.searchResults.length > 0 &&
                            <Card>
                                <CardFooter>
                                    <Button id="show-results" outline color="secondary" size="sm" onClick={() => this.props.handleShowResults()}>Show results</Button>
                                </CardFooter>
                            </Card>)
                }
            </>
        );
    }
}
