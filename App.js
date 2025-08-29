import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

const API_URL = "https://68b0edc73b8db1ae9c0531cd.mockapi.io/chatApi/messages"; // <-- Altere para sua API

export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [newMessage, setNewMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, { method: "GET" });
      if (!res.ok) {
        throw new Error(`GET falhou: ${res.status}`);
      }
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      Alert.alert("Erro ao buscar mensagens", String(err?.message || err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAll();
    setRefreshing(false);
  }, [fetchAll]);

  const handleSubmit = async () => {
    if (!newMessage.trim()) return;

    const userMessagePayload = {
        text: newMessage.trim(),
        sender: "user",
        timestamp: Date.now(), // Adicione esta linha
    };

    try {
        setSubmitting(true);
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userMessagePayload),
        });

        if (!res.ok) {
            const errText = await res.text().catch(() => "");
            throw new Error(`POST falhou: ${res.status} ${errText}`);
        }

        await fetchAll();
        setNewMessage("");

        // Lógica do assistente (aqui você já usa Date.now(), então está correto)
        const assistantMessagePayload = {
            text: "Olá! Como posso ajudar você?",
            sender: "assistant",
            timestamp: Date.now(),
            id: "assistant-" + Date.now(),
        };
        setMessages(prevMessages => [...prevMessages, assistantMessagePayload]);

    } catch (err) {
        Alert.alert("Erro ao enviar mensagem", String(err?.message || err));
    } finally {
        setSubmitting(false);
    }
};

  const renderItem = ({ item }) => {
    const isUser = item.sender === "user";
    return (
        <View style={[styles.messageBubble, isUser ? styles.userMessage : styles.otherMessage]}>
            <Text style={isUser ? styles.userMessageText : styles.otherMessageText}>
                {item.text}
            </Text>
            <Text style={styles.timestamp}>
                {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
        </View>
    );
};

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Chat Bot</Text>
          <Text style={styles.subtitle}>API Chat {API_URL}</Text>

          {loading ? (
            <ActivityIndicator style={{ marginTop: 8 }} />
          ) : (
            <FlatList
              data={messages}
              keyExtractor={(it, idx) => String(it?.id ?? idx)}
              renderItem={renderItem}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={
                <Text style={styles.empty}>Nenhuma mensagem ainda.</Text>
              }
              contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', paddingBottom: 10 }}
            />
          )}

          <View style={styles.form}>
            <TextInput
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Digite sua mensagem..."
              style={styles.input}
            />
            <TouchableOpacity
              disabled={submitting}
              style={[styles.button, submitting && { opacity: 0.6 }]}
              onPress={handleSubmit}
            >
              {submitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Enviar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0f172a" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  title: { fontSize: 22, fontWeight: "700", color: "white", marginBottom: 4 },
  subtitle: { color: "#cbd5e1", fontSize: 12, marginBottom: 12 },
  form: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#1e293b",
    borderRadius: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 12,
    paddingVertical: Platform.select({ ios: 12, android: 8 }),
    borderRadius: 12,
    fontSize: 16,
    color: "#0f172a",
    marginRight: 8,
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "700" },
  messageBubble: {
    borderRadius: 20,
    padding: 12,
    marginBottom: 8,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#4f46e5",
    alignSelf: "flex-end",
    borderBottomRightRadius: 6,
  },
  otherMessage: {
    backgroundColor: "#e2e8f0",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 6,
  },
  userMessageText: {
    color: "white",
  },
  otherMessageText: {
    color: "#0f172a",
  },
  timestamp: {
    marginTop: 4,
    fontSize: 10,
    color: "#94a3b8",
    alignSelf: "flex-end",
  },
  empty: {
    color: "#cbd5e1",
    textAlign: "center",
    marginTop: 12,
  },
});