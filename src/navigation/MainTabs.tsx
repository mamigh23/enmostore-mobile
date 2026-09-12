import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../features/HomeScreen';
import {ExploreScreen} from '../features/ExploreScreen';
import {SearchScreen} from '../features/SearchScreen';
import {FavoritesScreen} from '../features/FavoritesScreen';
import {CartScreen} from '../features/CartScreen';
import {AccountScreen} from '../features/AccountScreen';
import {useLocale} from '../core/localization/LocaleProvider';

type Tabs={Home:undefined;Explore:undefined;Search:undefined;Favorites:undefined;Cart:undefined;Account:undefined};
const Tab=createBottomTabNavigator<Tabs>();
export function MainTabs(){const {t}=useLocale();return <Tab.Navigator screenOptions={{headerShown:false}}><Tab.Screen name="Home" component={HomeScreen} options={{title:t('home')}}/><Tab.Screen name="Explore" component={ExploreScreen} options={{title:t('explore')}}/><Tab.Screen name="Search" component={SearchScreen} options={{title:t('search')}}/><Tab.Screen name="Favorites" component={FavoritesScreen} options={{title:t('favorites')}}/><Tab.Screen name="Cart" component={CartScreen} options={{title:t('cart')}}/><Tab.Screen name="Account" component={AccountScreen} options={{title:t('account')}}/></Tab.Navigator>}
