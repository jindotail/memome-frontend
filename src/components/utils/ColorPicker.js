import { findByLabelText } from '@testing-library/react';
import React from 'react';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import styles2 from './ColorPicker.module.css';

class ColorPicker extends React.Component {
    state = {
        displayColorPicker: false,
        color: {
            rgba: "#FFFFFF"
        },
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({ color: color.rgb })
    };

    render() {

        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
                colorPicker: {
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#000000'
                }
            },
        });

        return (
            <div className={styles2.colorPicker}>
                <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                </div>
                {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <SketchPicker color={this.state.color} onChange={this.handleChange} />
                </div> : null}
                <button className={styles2.button} onClick={() => this.props.setData([`rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`])} >
                    check
                </button>
            </div >
        )
    }
}

export default ColorPicker