import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {lightTheme, tokens} from '../design/tokens';
export function PrimaryButton({label,onPress}:{label:string;onPress:()=>void}){return <Pressable accessibilityRole="button" onPress={onPress} style={styles.button}><Text style={styles.label}>{label}</Text></Pressable>}
const styles=StyleSheet.create({button:{backgroundColor:lightTheme.primary,paddingVertical:14,paddingHorizontal:18,borderRadius:tokens.radius.md},label:{color:lightTheme.background,fontWeight:'700',textAlign:'center'}});
