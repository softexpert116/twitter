/**
 * The twitter search by user.
 *
 * @version 1.0.0
 * @author [Thia](https://github.com/Thia)
 *
 */
import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator} from 'react-native';
import { SearchBar, Divider, } from 'react-native-elements';

class SearchableListByUser extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      /**
       * the state of loading 
       */
      loading: false,
      /**
       * the data that is displied on the list 
       */
      data: [],
      /**
       * the error of loading 
       */
      error: null,
    };

    /**
     * the result of loading 
     */
    this.resHolder = [];
  }
 
  /**
   * When the SearchScreenByUser is mounted, we'll call makeRemoteRequest() to get some data.
   */
  componentDidMount() {
    this.makeRemoteRequest();
  }


  /**
   * This function goes and fetches some data using API(https://am-twitter-scrape.herokuapp.com/users/Twitter?pages_limit=3&wait=0).
   * When the request is complete, we will receive the data which is saved to data state and also to our resHolder.
   * we are using the fetch API to make a remote API request.
   */
  makeRemoteRequest = () => {
    const url = `https://am-twitter-scrape.herokuapp.com/users/Twitter?pages_limit=3&wait=0`;
    this.setState({ loading: true });

    fetch(url,{
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          error: null,
          loading: false,
        });
        this.resHolder = res;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };
  

  /**
   * this function will filter the response as the text inside the SearchBar changes.
   * it will be calling inside the SearchBar changes.
   * In this search, we will perform case-insensitive.
   */
  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const searchKey = text.replace(/\s/g, '');
    const patt = new RegExp(searchKey, "i");

    const newData = this.resHolder.filter(item => {
      return patt.test(item.account.fullname);
    });
    this.setState({
      data: newData,
    });
  }; 

  /**
   * This function is used to extract a unique key for a given item at the specified index.
   * We will call this function on ItemSeparatorComponent={} prop in FlatList. 
   */
  keyExtractor = (item, index) => index.toString()
  
  /**
   * This function will takes an item from data and renders it into the list.
   * We will call this function on renderItem={} prop in FlatList.
   */
  renderItem = ({ item }) => (
    <View style={{paddingHorizontal:15, paddingVertical:7}}>
      <Text numberOfLines={1} style={{fontWeight: 'bold'}}>
        Name:   
        <Text style={{fontSize: 23, fontWeight: 'normal'}}>
          {item.account.fullname}
        </Text>
      </Text>
      <Text numberOfLines={1} style={{fontWeight: 'bold'}}>
        Tweet:    
        <Text  style={{fontSize: 15, fontWeight: 'normal'}}>
          {item.text}
        </Text>
      </Text>
      <View style={{flexDirection:'row', flexWrap:'wrap'}}>
        <Text style={{flex:1,fontWeight: 'bold'}}>Likes:  <Text style={{fontSize: 15, fontWeight: 'normal'}}>{item.likes !=0 ? item.likes : '-'}</Text></Text>
        <Text style={{flex:1, fontWeight: 'bold'}}>Replies: <Text style={{fontSize: 15, fontWeight: 'normal'}}>{item.replies !=0 ? item.replies : '-'}</Text></Text>
        <Text style={{flex:1, fontWeight: 'bold'}}>Retweets:  <Text style={{fontSize: 15, fontWeight: 'normal'}}>{item.retweets !=0 ? item.retweets : '-'}</Text></Text>
      </View>
      <Text numberOfLines={1} style={{fontWeight: 'bold'}}>Hashtags: 
        <Text style={{fontSize: 15, fontWeight: 'normal'}}>{item.hashtags.length >0 ? ( item.hashtags[1] != null ? item.hashtags[0]+' '+item.hashtags[1] : item.hashtags[0] )  : '-'}</Text>
      </Text>
      <Text numberOfLines={1} style={{fontWeight: 'bold'}}>Date: 
        <Text style={{fontSize: 15, fontWeight: 'normal'}}>{item.date}</Text>
      </Text>
    </View>
  )

  /**
   * This function will show a line between each FlatList items.
   * We will call this function on keyExtractor={} prop in FlatList.
   */
  renderSeparator = () => {
    return (
      <Divider style={{ backgroundColor: 'blue' }} />
    );
  };
 
  /**
   * This function will render the header homponent at the top of FlatList.
   * we are using react-native-elements SearchBar component as out header component.
   * We will call this function on ListHeaderComponent={} prop in FlatList.
   */
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type User..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  /**
   * We will use FlatList component.
   * It’s an easy way to make an efficient scrolling list of data.
   */
  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:30 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        stickyHeaderIndices={[0]} 
      />
    );
  }

}

export default SearchableListByUser;

