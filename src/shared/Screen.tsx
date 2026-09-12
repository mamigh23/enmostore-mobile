import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {lightTheme, tokens} from '../design/tokens';

export function Screen({title, children}: {title: string; children?: React.ReactNode}) {
  return <SafeAreaView style={styles.safe}><View style={styles.container}><Text style={styles.title}>{title}</Text>{children}</View></SafeAreaView>;
}
const styles = StyleSheet.create({safe:{flex:1,backgroundColor:lightTheme.background},container:{flex:1,padding:tokens.spacing.lg},title:{fontSize:tokens.typography.title,fontWeight:'700',color:lightTheme.text,marginBottom:tokens.spacing.md}});
