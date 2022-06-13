import React, { Component } from "react";
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
import Collapsible from "react-native-collapsible";
import Accordion from "react-native-collapsible/Accordion";


const CONTENT = [
  {
    title: "Helen Keller",
    content: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
  },
  {
    title: "Walt Whitman",
    content: "Keep your face always toward the sunshine - and shadows will fall behind you.",
  },
  {
    title: "John F. Kennedy",
    content: "Things do not happen. Things are made to happen.",
  },
  {
    title: "Audrey Hepburn",
    content: "Nothing is impossible, the word itself says 'I'm possible'!",
  },
  {
    title: "Vince Lombardi",
    content: "Perfection is not attainable, but if we chase perfection we can catch excellence.",
  },
];

const SELECTORS = [
  {
    title: "Helen Keller",
    value: 0,
  },
  {
    title: "John F. Kennedy",
    value: 2,
  },
  {
    title: "None",
  },
];

export default class App extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text>{section.content}</Text>
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
          <Text style={styles.title}>Quotes Selector</Text>

          <View style={styles.multipleToggle}>
            <Text style={styles.multipleToggle__title}>Turn On Multiple Select</Text>
            <Switch
              value={multipleSelect}
              onValueChange={(a) => this.setState({ multipleSelect: a })}
            />
          </View>

          <View style={styles.selectors}>
            <Text style={styles.selectTitle}>Select:</Text>

            {SELECTORS.map((selector) => (
              <TouchableOpacity
                key={selector.title}
                onPress={() => this.setSections([selector.value])}
              >
                <View style={styles.selector}>
                  <Text
                    style={
                      activeSections.includes(selector.value) &&
                      styles.activeSelector
                    }
                  >
                    {selector.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={this.toggleExpanded}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Press me first</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={this.state.collapsed}>
            <View style={styles.content}>
              <Animatable.Text
                animation={this.state.collapsed ? undefined : "zoomIn"}
                duration={300}
                useNativeDriver
              >
               This is the header it will stay open until you press the button again
                  check some famous Quotes by some famous people down here.
              </Animatable.Text>
            </View>
          </Collapsible>
          <Accordion
            align="bottom"
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
            renderAsFlatList={false}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 20,
    fontFamily: "Verdana, Arial, Tahoma, Serif;",
  },
  header: {
    backgroundColor: "#FF6E33",
    padding: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "#52FF33",
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)",
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  activeSelector: {
    fontWeight: "bold",
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
  },
  multipleToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
    alignItems: "center",
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
    fontStyle: "italic",
    fontFamily: "Verdana, Arial, Tahoma, Serif;",
  },
});