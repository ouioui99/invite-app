import { useRouter } from "next/router";
import { useEffect } from "react";

const InvitePage = () => {
  const router = useRouter();
  const { inviteCode } = router.query;

  useEffect(() => {
    if (!inviteCode) return;

    // 招待コードを検証してリダイレクト（例: 認証後に参加ページへ）
    router.replace(`/join-group?code=${inviteCode}`);
  }, [inviteCode]);

  return <p>招待リンクを確認中...</p>;
};

export default InvitePage;
