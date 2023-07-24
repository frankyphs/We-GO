// import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
} from "react-native";
// import * as TalkRn from "@talkjs/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatScreen = () => {
  // const [name, setName] = useState("");
  // const [user, setUser] = useState(null);
  // const [admin, setAdmin] = useState(null);
  // useEffect(() => {
  //   AsyncStorage.getItem("username").then((res) => {
  //     console.log(res);
  //     if (res === "Ciptandaru") {
  //       setAdmin({
  //         id: 2,
  //         name: "Admin",
  //         role: "admin",
  //       });
  //       setUser({
  //         id: 1,
  //         name: name,
  //         role: "default",
  //       });
  //     } else {
  //       setName(res);
  //     }
  //   });
  // }, []);

  // const me = admin || {
  //   id: 1,
  //   name: name,
  //   role: "default",
  // };
  // const other = user || {
  //   id: 2,
  //   name: "Admin",
  //   email: "EMAIL",
  //   welcomeMessage: "Ada yang bisa saya bantu?",
  //   role: "admin",
  // };

  // const conversationBuilder = TalkRn.getConversationBuilder(
  //   TalkRn.oneOnOneId(me, other)
  // );

  // conversationBuilder.setParticipant(me);
  // conversationBuilder.setParticipant(other);
  return (
    <View style={styles.container}>
      {/* <TalkRn.Session appId="tuqylOOF" me={me}>
        <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
      </TalkRn.Session> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: "#fff",
  },
  senderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  receiverContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  senderContent: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#DCF8C6",
  },
  receiverContent: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#F4F4F4",
  },
  userName: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    color: "gray",
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#0084FF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default ChatScreen;
