import { useThemeColors } from "@/hooks/useThemeColors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
  /** Verifies the code with Clerk. Return an error message on failure, or null on success. */
  onVerify: (code: string) => Promise<string | null>;
};

export function VerificationModal({ visible, email, onClose, onVerify }: VerificationModalProps) {
  const colors = useThemeColors();
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (!visible) return;
    setDigits(Array(CODE_LENGTH).fill(""));
    setError(null);
    setIsVerifying(false);
    const focusTimer = setTimeout(() => inputRefs.current[0]?.focus(), 150);
    return () => clearTimeout(focusTimer);
  }, [visible]);

  const handleChangeDigit = async (text: string, index: number) => {
    const value = text.slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = value;
    setDigits(nextDigits);
    setError(null);

    if (!value) return;

    if (index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
      return;
    }

    if (nextDigits.every((digit) => digit !== "")) {
      setIsVerifying(true);
      const verifyError = await onVerify(nextDigits.join(""));
      setIsVerifying(false);

      if (verifyError) {
        setError(verifyError);
        setDigits(Array(CODE_LENGTH).fill(""));
        inputRefs.current[0]?.focus();
        return;
      }

      onClose();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/40">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ width: "100%" }}
        >
          <View className="gap-6 rounded-t-3xl bg-surface px-6 pb-8 pt-6">
            <View className="flex-row items-start justify-between">
              <Text className="flex-1 pr-4 text-h3 font-poppins-bold text-text-primary">
                Verify your email
              </Text>
              <TouchableOpacity onPress={onClose} hitSlop={8}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text className="text-body-md font-poppins-regular text-text-secondary">
              We sent a 6-digit code to{" "}
              <Text className="font-poppins-semibold text-text-primary">{email}</Text>. Enter it
              below to continue.
            </Text>

            <View className="flex-row justify-between">
              {digits.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(inputRef) => {
                    inputRefs.current[index] = inputRef;
                  }}
                  value={digit}
                  onChangeText={(text) => handleChangeDigit(text, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  editable={!isVerifying}
                  className="h-14 w-12 rounded-2xl border border-border text-h3 font-poppins-bold text-text-primary"
                  style={{ textAlign: "center" }}
                />
              ))}
            </View>

            {isVerifying && <ActivityIndicator color={colors.purple} />}

            {error && (
              <Text className="text-body-sm font-poppins-medium text-error">{error}</Text>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
