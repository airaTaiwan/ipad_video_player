/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import WebView from 'react-native-webview';
import {
  WebViewErrorEvent,
  WebViewNavigationEvent,
} from 'react-native-webview/lib/WebViewTypes';
import {AttachmentProcessor} from './src/native-modules';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#000'
  };

  const handleLoad = (e: WebViewErrorEvent | WebViewNavigationEvent) => {
    // @ts-ignore
    const {target: nativeTag} = e.nativeEvent;
    console.log('nativeTag:', nativeTag, typeof AttachmentProcessor);
    if (AttachmentProcessor) {
      AttachmentProcessor.process(nativeTag);
    }
  };

  return (
    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle, { flex: 1 }]}
        contentContainerStyle={{ flex: 1 }}
      >
        <WebView
          style={{
            flex: 1,
          }}
          source={{
            uri: 'Web.bundle/index.html',
          }}
          originWhitelist={['*']}
          contentMode='desktop'
          webviewDebuggingEnabled={true}
          onLoad={handleLoad}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
