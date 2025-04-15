import React, { useEffect } from "react";
import { Alert, Linking, Platform, Button, View, Text } from "react-native";
import { useRouter } from "next/router";

// 招待コードをもとにアプリ内で適切な処理を行う関数
const openAppOrStore = async (inviteCode: string) => {
  const deepLink = `yourapp://join-group?code=${inviteCode}`; // ディープリンク
  try {
    // アプリがインストールされているか確認
    const supported = await Linking.canOpenURL(deepLink);

    if (supported) {
      // アプリがインストールされていればディープリンクを開く
      await Linking.openURL(deepLink);
    } else {
      // アプリがインストールされていなければ、ストアにリダイレクト
      const appStoreUrl = "https://apps.apple.com/us/app/your-app-id"; // iOSのApp Store URL
      const playStoreUrl =
        "https://play.google.com/store/apps/details?id=com.yourapp"; // AndroidのURL
      const storeUrl = Platform.OS === "ios" ? appStoreUrl : playStoreUrl;
      await Linking.openURL(storeUrl);
    }
  } catch (error) {
    Alert.alert("エラー", "エラーが発生しました。");
  }
};

const InvitePage = () => {
  const router = useRouter();
  const { inviteCode } = router.query;

  useEffect(() => {
    if (inviteCode) {
      openAppOrStore(String(inviteCode)); // 招待コードが取得できたら処理を実行
    }
  }, [inviteCode]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>招待コード: {inviteCode}</Text>
      <Button
        title="招待リンクを開く"
        onPress={() => {
          if (inviteCode) {
            openAppOrStore(String(inviteCode)); // 手動でボタンを押して招待リンクを開く
          }
        }}
      />
    </View>
  );
};

export default InvitePage;
