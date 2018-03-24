import React from 'react';
import { ScrollView, ListView, View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux'

import { getEntities } from '../../api/movie.reducer'

const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

class MovieList extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            isLoading: true,
            dataSource: ds
        }
    }

    componentDidMount() {
        this.props.getEntities();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.movies != null && newProps.movies.movies != null) {
            const dataSource = ds.cloneWithRows(newProps.movies.movies);
            this.setState({
                isLoading: false,
                dataSource
            });
        }
    }

    static navigationOptions = {
        title: 'Movies',
    };

    render() {
        return (
           this.state.isLoading ? <View><Text>Loading...</Text></View>
               : <ListView dataSource={this.state.dataSource} renderRow={(movie) => <Text>{movie.title}</Text>} />
        );
    }
}

const mapStateToProps = storeState => ({
    movies: storeState.movie.entities
});

const mapDispatchToProps = { getEntities };

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
