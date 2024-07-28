import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Android12Switch from './Android12Switch';
import { Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './ContainerCard.css'

const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

const ContainerCard = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box className="root">
                <Typography variant="h5" className="header">
                    Accessibility Options
                </Typography>
                <Card className="card">
                    <CardContent className="switchLabel">
                        <Typography variant="body1" className="switchDescription">
                            Text Size
                            <Typography variant="body2" color="textSecondary">
                                Increase the font on pages for better readability.
                            </Typography>
                        </Typography>
                        <Android12Switch />
                    </CardContent>
                </Card>
                <Card className="card">
                    <CardContent className="switchLabel">
                        <Typography variant="body1" className="switchDescription">
                            Alternative Text / Screen Reader
                            <Typography variant="body2" color="textSecondary">
                                Replace images with their alternative text to provide support for a screen reader.
                            </Typography>
                        </Typography>
                        <Android12Switch />
                    </CardContent>
                </Card>
                <Card className="card">
                    <CardContent className="switchLabel">
                        <Typography variant="body1" className="switchDescription">
                            Image Contrast
                            <Typography variant="body2" color="textSecondary">
                                Increase the contrast of images to make them easier to view.
                            </Typography>
                        </Typography>
                        <Android12Switch />
                    </CardContent>
                </Card>
                <Card className="card">
                    <CardContent className="switchLabel">
                        <Typography variant="body1" className="switchDescription">
                            Colour
                            <Typography variant="body2" color="textSecondary">
                                Modify the interface into black and white to remove color.
                            </Typography>
                        </Typography>
                        <Android12Switch />
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider>
    );
};

export default ContainerCard;