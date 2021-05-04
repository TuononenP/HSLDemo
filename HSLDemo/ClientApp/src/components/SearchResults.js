import React, { Component } from 'react';
import { Card, Button } from 'reactstrap';

export class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResults: props.searchResults,
            selectedResult: props.selectedResult
        };
    }

    render() {
        return (
            <>
                {this.state.searchResults.length > 0 &&
                    <Card body>
                        {this.state.searchResults.map((result, idx) =>
                            <Button key={'searchResultBtn-' + idx} outline={this.state.selectedResult !== result}
                                color="secondary" className="searchResultButton" onClick={() => this.props.handleSelectResult(result)}>
                                {result.label}
                            </Button>
                        )}
                    </Card>
                }
            </>
        );
    }
}
