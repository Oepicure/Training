import React from 'react';
import styles from '../styles.js'
import { MapView } from 'expo'

class Map extends React.Component {
    render() {
        const {location} = this.props.navigation.state.params
        return (
            <Mapview
                style={styles.container}
                initialRegion={{
                    latitude: location.coords.lat,
                    longitude: location.coords.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Mapview.Marker
                    coordinate={{
                        latitude: location.coords.lat,
                        longitude: location.coords.lng
                    }}
                    title={location.name}
                />
            </Mapview>
        )
    }
}

export default Map;