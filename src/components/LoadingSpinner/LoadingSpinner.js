import React from 'react';
import { css } from '@emotion/core';
// First way to import
import { ScaleLoader } from 'react-spinners';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export default class LoadingSpinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    render() {
        return (
            <div>
                <ScaleLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#8A2BE2'}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}