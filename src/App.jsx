import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const ADMIN_EMAIL = "dotemiracle@gmail.com"; // 관리자 이메일

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const COLORS = ["#E6F1FB","#EAF3DE","#FAECE7","#EEEDFE","#E1F5EE","#FAEEDA","#FBEAF0","#F1EFE8","#FCEBEB"];

const ALL_CHALLENGES = [
  { name: "01 감정 아로마 21일 챌린지", icon: "💚", routines: [
    { id:1, icon:"🌸", name:"오늘의 향기 체크", duration:5 },
    { id:2, icon:"🧘", name:"향기 명상", duration:10 },
    { id:3, icon:"📓", name:"감사 일기 쓰기", duration:10 },
  ]},
  { name: "02 차크라 아로마 21일 챌린지", icon: "🧘", routines: [
    { id:1, icon:"🧘", name:"차크라 명상", duration:10 },
    { id:2, icon:"📓", name:"차크라 저널링", duration:10 },
    { id:3, icon:"🌿", name:"차크라 오일 바르기", duration:5 },
    { id:4, icon:"📝", name:"EMC 저널링", duration:10 },
  ]},
  { name: "03 성경 아로마 21일 챌린지", icon: "✝️", routines: [
    { id:1, icon:"📖", name:"오늘의 말씀 읽기", duration:10 },
    { id:2, icon:"🌿", name:"성경 오일 묵상", duration:10 },
    { id:3, icon:"📓", name:"챌린지북 작성", duration:10 },
  ]},
  { name: "04 뉴로 아로마 21일 챌린지", icon: "🧠", routines: [
    { id:1, icon:"🧠", name:"뉴로헬스 인증", duration:5 },
    { id:2, icon:"👃", name:"후각 호흡 3분", duration:3 },
    { id:3, icon:"🤲", name:"향기 뉴로터치 8", duration:10 },
    { id:4, icon:"🌿", name:"신경 안정 오일 수시로 맡기", duration:5 },
    { id:5, icon:"📓", name:"챌린지북 작성", duration:10 },
  ]},
  { name: "05 인지후각 아로마 21일 챌린지", icon: "👃", routines: [
    { id:1, icon:"🌸", name:"오늘의 향기 체크", duration:5 },
    { id:2, icon:"🧠", name:"향기 기억 훈련", duration:10 },
    { id:3, icon:"📓", name:"향기 표현 저널링", duration:10 },
    { id:4, icon:"📝", name:"인지후각 챌린지북 작성", duration:10 },
  ]},
  { name: "06 셀톡스 아로마 21일 챌린지", icon: "🔬", routines: [
    { id:1, icon:"🌿", name:"셀톡스 집중 오일 바르기", duration:5 },
    { id:2, icon:"💧", name:"레몬수 물 마시기 체크", duration:3 },
    { id:3, icon:"💆", name:"복부 또는 림프 마사지", duration:10 },
    { id:4, icon:"💊", name:"영양제 먹기", duration:3 },
  ]},
  { name: "07 두톡스 아로마 21일 챌린지", icon: "💆", routines: [
    { id:1, icon:"🌿", name:"두피 오일 케어", duration:10 },
    { id:2, icon:"🪄", name:"목·어깨 괄사 마사지", duration:10 },
    { id:3, icon:"✅", name:"두피 순환 체크", duration:5 },
    { id:4, icon:"📸", name:"두톡스 루틴 인증", duration:5 },
  ]},
  { name: "08 경피독 아로마 21일 챌린지", icon: "🛡️", routines: [
    { id:1, icon:"🔍", name:"오늘의 경피독 체크", duration:5 },
    { id:2, icon:"🏷️", name:"생활용품 성분 확인", duration:10 },
    { id:3, icon:"🌿", name:"천연 아로마 대체 루틴", duration:10 },
    { id:4, icon:"📸", name:"경피독 줄이기 미션 인증", duration:5 },
  ]},
  { name: "09 호르몬 밸런스 아로마 21일 챌린지", icon: "⚖️", routines: [
    { id:1, icon:"📊", name:"여성 리듬 체크", duration:5 },
    { id:2, icon:"🌿", name:"하복부 또는 발목 오일 바르기", duration:5 },
    { id:3, icon:"🌬️", name:"호르몬 밸런스 호흡", duration:10 },
    { id:4, icon:"📓", name:"호르몬 저널링북 완성", duration:10 },
  ]},
  { name: "10 엄마 마음 회복 아로마 21일 챌린지", icon: "💗", routines: [
    { id:1, icon:"💗", name:"오늘의 엄마 마음 체크", duration:5 },
    { id:2, icon:"🌿", name:"나를 위한 향기 루틴", duration:10 },
    { id:3, icon:"🧘", name:"5분 쉼 명상", duration:5 },
    { id:4, icon:"📓", name:"엄마 마음 저널링", duration:10 },
  ]},
  { name: "11 키즈 아로마 21일 챌린지", icon: "🧒", routines: [
    { id:1, icon:"👩‍🏫", name:"미라클 선생님 만나기", duration:10 },
    { id:2, icon:"🤲", name:"8종 터치", duration:10 },
    { id:3, icon:"📓", name:"키즈 아로마 일기장 쓰기", duration:10 },
  ]},
  { name: "12 키즈 성장 아로마 21일 챌린지", icon: "🌱", routines: [
    { id:1, icon:"🤸", name:"성장 스트레칭", duration:10 },
    { id:2, icon:"🌿", name:"발바닥 오일 케어", duration:5 },
    { id:3, icon:"😴", name:"수면 루틴 체크", duration:5 },
    { id:4, icon:"📓", name:"키즈 성장 기록 작성", duration:10 },
  ]},
  { name: "13 청소년 마음키우기 아로마 21일 챌린지", icon: "🌟", routines: [
    { id:1, icon:"🌤️", name:"오늘의 마음 날씨 체크", duration:5 },
    { id:2, icon:"👃", name:"나에게 맞는 향기 찾기", duration:10 },
    { id:3, icon:"🌿", name:"집중 또는 안정 오일 사용", duration:5 },
    { id:4, icon:"📓", name:"감정 표현 저널링", duration:10 },
  ]},
  { name: "14 아로마터치 21일 챌린지", icon: "🤲", routines: [
    { id:1, icon:"📚", name:"오늘의 터치 부위 배우기", duration:10 },
    { id:2, icon:"🤲", name:"손·발 아로마터치", duration:10 },
    { id:3, icon:"🌿", name:"오일 사용 루틴", duration:5 },
    { id:4, icon:"📓", name:"케어 후 느낌 기록", duration:5 },
  ]},
  { name: "15 19금 아로마 21일 챌린지", icon: "🔞", routines: [
    { id:1, icon:"💫", name:"나의 몸 감각 체크", duration:5 },
    { id:2, icon:"🌹", name:"분위기 오일 루틴", duration:10 },
    { id:3, icon:"🤲", name:"터치 또는 셀프케어 루틴", duration:10 },
    { id:4, icon:"📓", name:"나를 위한 감각 저널링", duration:10 },
  ]},
];

function getRoutinesForChallenge(name) {
  const found = ALL_CHALLENGES.find(c => c.name === name);
  if (found) return found.routines;
  return [
    { id:1, icon:"🌅", name:"명상", duration:10 },
    { id:2, icon:"📓", name:"저널링", duration:10 },
    { id:3, icon:"🌿", name:"아로마 오일 바르기", duration:5 },
    { id:4, icon:"📝", name:"EMC 저널링", duration:10 },
  ];
}

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function formatDate(d = new Date()) {
  return `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 (${DAYS[d.getDay()]})`;
}
function formatTime(d = new Date()) {
  return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}
function daysSince(dateStr) {
  return Math.floor((new Date() - new Date(dateStr)) / 86400000) + 1;
}
function isActive(c) {
  const now = new Date();
  const start = new Date(c.start_date);
  const end = c.end_date ? new Date(c.end_date) : null;
  return start <= now && (!end || end >= now);
}

function Spinner() {
  return (
    <div style={{ display:"flex", justifyContent:"center", padding:"3rem" }}>
      <div style={{ width:32, height:32, border:"3px solid #e8e8e8", borderTop:"3px solid #1D9E75", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── 사진 인증 팝업 ────────────────────────────────────────────────────────────
function PhotoModal({ routine, userId, challengeId, today, onClose, onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [done, setDone] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
    setUploading(true);
    const path = `${userId}/${challengeId}/${today}/routine_${routine.id}.jpg`;
    const { error } = await supabase.storage.from("photos").upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from("photos").getPublicUrl(path);
      onUploaded(routine.id, data.publicUrl);
      setDone(true);
    }
    setUploading(false);
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:300, padding:"1rem" }}>
      <div style={{ background:"#fff", borderRadius:24, padding:"1.75rem", width:"100%", maxWidth:340, textAlign:"center" }}>
        <div style={{ fontSize:40, marginBottom:8 }}>{routine.icon}</div>
        <div style={{ fontWeight:700, fontSize:18, marginBottom:4 }}>{routine.name}</div>
        <div style={{ fontSize:14, color:"#888", marginBottom:20 }}>{done ? "인증 완료! 🎉" : "인증 사진을 올려주세요 📸"}</div>
        {preview && <img src={preview} alt="미리보기" style={{ width:"100%", borderRadius:14, marginBottom:16, maxHeight:220, objectFit:"cover" }} />}
        {done ? (
          <button onClick={onClose} style={{ width:"100%", padding:"13px", borderRadius:12, border:"none", background:"#1D9E75", color:"#fff", fontWeight:700, fontSize:16, cursor:"pointer" }}>✓ 확인</button>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <label style={{ display:"block", padding:"13px", borderRadius:12, background:"#1D9E75", color:"#fff", fontWeight:600, fontSize:15, cursor:"pointer" }}>
              <input type="file" accept="image/*" capture="environment" style={{ display:"none" }} onChange={handleFile} />
              {uploading ? "업로드 중..." : "📷 지금 사진 찍기"}
            </label>
            <label style={{ display:"block", padding:"13px", borderRadius:12, border:"1.5px solid #ddd", background:"transparent", color:"#555", fontWeight:500, fontSize:15, cursor:"pointer" }}>
              <input type="file" accept="image/*" style={{ display:"none" }} onChange={handleFile} />
              🖼️ 갤러리에서 선택
            </label>
            <button onClick={onClose} style={{ padding:"11px", borderRadius:12, border:"none", background:"#f5f5f5", color:"#999", fontWeight:500, fontSize:14, cursor:"pointer" }}>나중에 할게요</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── 로그인 ───────────────────────────────────────────────────────────────────
function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    setLoading(true); setError("");
    const { error: err } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    if (err) setError(err.message);
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f7f8fa" }}>
      <div style={{ background:"#fff", borderRadius:24, padding:"2.5rem 2rem", width:"100%", maxWidth:360, textAlign:"center", boxShadow:"0 4px 24px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🌅</div>
        <h1 style={{ fontSize:24, fontWeight:700, margin:"0 0 8px" }}>미라클 아로마</h1>
        <p style={{ color:"#888", fontSize:14, margin:"0 0 24px" }}>21일 챌린지 인증 플랫폼</p>
        {error && <p style={{ color:"#dc2626", fontSize:13, marginBottom:12 }}>{error}</p>}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일" type="email"
          style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1px solid #ddd", fontSize:15, marginBottom:10, boxSizing:"border-box" }} />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호" type="password"
          style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1px solid #ddd", fontSize:15, marginBottom:16, boxSizing:"border-box" }} />
        <button onClick={handleAuth} disabled={loading}
          style={{ width:"100%", padding:13, borderRadius:12, border:"none", background:"#1D9E75", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer", marginBottom:12 }}>
          {loading ? "처리 중..." : isSignUp ? "회원가입" : "로그인"}
        </button>
        <button onClick={() => setIsSignUp(s => !s)}
          style={{ background:"none", border:"none", color:"#1D9E75", cursor:"pointer", fontSize:14 }}>
          {isSignUp ? "이미 계정이 있어요 → 로그인" : "계정이 없어요 → 회원가입"}
        </button>
      </div>
    </div>
  );
}

// ── 관리자 패널 ───────────────────────────────────────────────────────────────
function AdminPanel({ userId, onBack }) {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [codes, setCodes] = useState([]);
  const [members, setMembers] = useState([]);
  const [tab, setTab] = useState("challenges");
  const [startDate, setStartDate] = useState(getTodayStr());
  const [endDate, setEndDate] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const loadChallenges = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("challenges").select("*").order("created_at", { ascending: false });
    setChallenges(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadChallenges(); }, [loadChallenges]);

  const createChallenge = async () => {
    if (!selectedTemplate) return;
    setCreating(true);
    const { data } = await supabase.from("challenges").insert({
      name: selectedTemplate.name,
      description: `${selectedTemplate.name} - ${startDate} ~ ${endDate || "무기한"}`,
      duration_days: 21,
      start_date: startDate,
      end_date: endDate || null,
      created_by: userId,
    }).select().single();
    if (data) {
      await supabase.from("challenge_members").insert({ challenge_id: data.id, user_id: userId, role: "admin" });
    }
    setSelectedTemplate(null);
    setCreating(false);
    loadChallenges();
  };

  const generateCode = async (challengeId) => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    await supabase.from("activation_codes").insert({ code, challenge_id: challengeId });
    loadCodesForChallenge(challengeId);
  };

  const loadCodesForChallenge = async (challengeId) => {
    const { data } = await supabase.from("activation_codes").select("*").eq("challenge_id", challengeId).order("created_at", { ascending: false });
    setCodes(data || []);
  };

  const loadMembersForChallenge = async (challengeId) => {
    const { data: memberList } = await supabase.from("challenge_members").select("*, auth_users:user_id(email)").eq("challenge_id", challengeId);
    const { data: records } = await supabase.from("daily_records").select("*").eq("challenge_id", challengeId);
    const { data: completions } = await supabase.from("completions").select("*").eq("challenge_id", challengeId);
    const enriched = (memberList || []).map(m => {
      const myRec = (records || []).filter(r => r.user_id === m.user_id);
      const totalDone = myRec.reduce((a, r) => a + r.completed_routines, 0);
      const totalPossible = myRec.length * 4;
      const pct = totalPossible > 0 ? Math.round(totalDone / totalPossible * 100) : 0;
      const completion = (completions || []).find(c => c.user_id === m.user_id);
      const todayRec = myRec.find(r => r.record_date === getTodayStr());
      const todayPhotos = todayRec?.routine_photos ? Object.values(todayRec.routine_photos) : [];
      return { ...m, pct, days: myRec.length, completion, todayPhotos };
    });
    setMembers(enriched);
  };

  const setLeader = async (challengeId, memberId, currentRole) => {
    const newRole = currentRole === "leader" ? "member" : "leader";
    await supabase.from("challenge_members").update({ role: newRole }).eq("id", memberId);
    loadMembersForChallenge(challengeId);
  };

  const confirmCompletion = async (challengeId, memberUserId) => {
    await supabase.from("completions").upsert({
      challenge_id: challengeId, user_id: memberUserId,
      confirmed_by: userId, confirmed_at: new Date().toISOString(), gift_sent: true,
    }, { onConflict: "challenge_id,user_id" });
    loadMembersForChallenge(challengeId);
  };

  const toggleActive = async (challenge) => {
    const today = getTodayStr();
    if (isActive(challenge)) {
      await supabase.from("challenges").update({ end_date: today }).eq("id", challenge.id);
    } else {
      await supabase.from("challenges").update({ start_date: today, end_date: null }).eq("id", challenge.id);
    }
    loadChallenges();
  };

  if (selectedChallenge) {
    return (
      <div style={{ minHeight:"100vh", background:"#f7f8fa" }}>
        <div style={{ maxWidth:480, margin:"0 auto", background:"#fff", minHeight:"100vh" }}>
          <div style={{ padding:"1.25rem", display:"flex", alignItems:"center", gap:12, borderBottom:"0.5px solid #e8e8e8" }}>
            <button onClick={() => { setSelectedChallenge(null); setCodes([]); setMembers([]); }} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>←</button>
            <div style={{ flex:1, fontWeight:700, fontSize:16 }}>{selectedChallenge.name}</div>
            <div style={{ fontSize:12, padding:"4px 10px", borderRadius:20, background: isActive(selectedChallenge) ? "#E1F5EE" : "#fee2e2", color: isActive(selectedChallenge) ? "#0F6E56" : "#991b1b", fontWeight:600 }}>
              {isActive(selectedChallenge) ? "활성" : "비활성"}
            </div>
          </div>

          <div style={{ display:"flex", borderBottom:"0.5px solid #e8e8e8" }}>
            {[{key:"members", label:"멤버"}, {key:"codes", label:"코드"}, {key:"settings", label:"설정"}].map(t => (
              <button key={t.key} onClick={() => { setTab(t.key); if(t.key==="codes") loadCodesForChallenge(selectedChallenge.id); if(t.key==="members") loadMembersForChallenge(selectedChallenge.id); }}
                style={{ flex:1, padding:"12px", border:"none", background:"none", borderBottom: tab===t.key ? "2px solid #1D9E75" : "none", color: tab===t.key ? "#1D9E75" : "#888", fontWeight: tab===t.key ? 700 : 400, cursor:"pointer", fontSize:14 }}>
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ padding:"1rem 1.25rem" }}>
            {tab === "members" && (
              <div>
                <div style={{ fontWeight:600, marginBottom:12 }}>참가자 {members.length}명</div>
                {members.map(m => (
                  <div key={m.id} style={{ background:"#f7f8fa", borderRadius:14, padding:"1rem", marginBottom:10 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:600, fontSize:14 }}>{m.nickname || "참가자"}</div>
                        <div style={{ fontSize:12, color:"#888" }}>{m.days}일 참가 · {m.pct}% 달성</div>
                      </div>
                      <div style={{ display:"flex", gap:6 }}>
                        <button onClick={() => setLeader(selectedChallenge.id, m.id, m.role)}
                          style={{ padding:"4px 10px", borderRadius:8, border:"none", background: m.role==="leader" ? "#EEEDFE" : "#f0f0f0", color: m.role==="leader" ? "#534AB7" : "#888", fontSize:12, fontWeight:600, cursor:"pointer" }}>
                          {m.role === "leader" ? "⭐ 리더" : "리더지정"}
                        </button>
                        {m.days >= 21 && !m.completion && (
                          <button onClick={() => confirmCompletion(selectedChallenge.id, m.user_id)}
                            style={{ padding:"4px 10px", borderRadius:8, border:"none", background:"#E1F5EE", color:"#0F6E56", fontSize:12, fontWeight:600, cursor:"pointer" }}>
                            🎁 완료확인
                          </button>
                        )}
                        {m.completion && (
                          <div style={{ padding:"4px 10px", borderRadius:8, background:"#FAEEDA", color:"#633806", fontSize:12, fontWeight:600 }}>🎁 선물완료</div>
                        )}
                      </div>
                    </div>
                    <div style={{ height:6, background:"#e8e8e8", borderRadius:3, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${Math.min(m.days/21*100,100)}%`, background:"#1D9E75", borderRadius:3 }} />
                    </div>
                    <div style={{ fontSize:11, color:"#999", marginTop:4 }}>{m.days}/21일 완료</div>
                    {m.todayPhotos.length > 0 && (
                      <div style={{ display:"flex", gap:6, marginTop:8, overflowX:"auto" }}>
                        {m.todayPhotos.map((url, j) => (
                          <img key={j} src={url} alt="인증" style={{ width:70, height:70, borderRadius:8, objectFit:"cover", flexShrink:0 }} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {members.length === 0 && <div style={{ textAlign:"center", color:"#bbb", padding:"2rem" }}>아직 참가자가 없어요</div>}
              </div>
            )}

            {tab === "codes" && (
              <div>
                <button onClick={() => generateCode(selectedChallenge.id)}
                  style={{ width:"100%", padding:"12px", borderRadius:12, border:"none", background:"#1D9E75", color:"#fff", fontWeight:600, fontSize:15, cursor:"pointer", marginBottom:16 }}>
                  + 새 초대 코드 생성
                </button>
                {codes.map(c => (
                  <div key={c.id} style={{ background:"#f7f8fa", borderRadius:12, padding:"1rem", marginBottom:8, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:18, letterSpacing:3, color: c.used_by ? "#bbb" : "#1D9E75" }}>{c.code}</div>
                      <div style={{ fontSize:12, color:"#888", marginTop:2 }}>{c.used_by ? "✓ 사용됨" : "미사용"}</div>
                    </div>
                    <button onClick={() => navigator.clipboard.writeText(c.code)}
                      style={{ padding:"6px 12px", borderRadius:8, border:"1px solid #ddd", background:"#fff", fontSize:12, cursor:"pointer" }}>복사</button>
                  </div>
                ))}
                {codes.length === 0 && <div style={{ textAlign:"center", color:"#bbb", padding:"2rem" }}>코드를 생성해보세요</div>}
              </div>
            )}

            {tab === "settings" && (
              <div>
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontSize:13, color:"#888", marginBottom:6 }}>활성화 상태</div>
                  <button onClick={() => toggleActive(selectedChallenge)}
                    style={{ width:"100%", padding:"12px", borderRadius:12, border:"none", background: isActive(selectedChallenge) ? "#fee2e2" : "#E1F5EE", color: isActive(selectedChallenge) ? "#991b1b" : "#0F6E56", fontWeight:600, fontSize:15, cursor:"pointer" }}>
                    {isActive(selectedChallenge) ? "🔒 챌린지 비활성화" : "🔓 챌린지 활성화"}
                  </button>
                </div>
                <div style={{ background:"#f7f8fa", borderRadius:12, padding:"1rem" }}>
                  <div style={{ fontSize:13, color:"#888", marginBottom:4 }}>시작일</div>
                  <div style={{ fontWeight:600 }}>{selectedChallenge.start_date}</div>
                  <div style={{ fontSize:13, color:"#888", marginTop:8, marginBottom:4 }}>종료일</div>
                  <div style={{ fontWeight:600 }}>{selectedChallenge.end_date || "무기한"}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:"#f7f8fa" }}>
      <div style={{ maxWidth:480, margin:"0 auto", background:"#fff", minHeight:"100vh" }}>
        <div style={{ padding:"1.25rem", display:"flex", alignItems:"center", gap:12, borderBottom:"0.5px solid #e8e8e8" }}>
          <button onClick={onBack} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>←</button>
          <div style={{ flex:1, fontWeight:700, fontSize:18 }}>👑 관리자 패널</div>
        </div>

        <div style={{ padding:"1rem 1.25rem" }}>
          {/* 챌린지 생성 */}
          <div style={{ background:"#f7f8fa", borderRadius:16, padding:"1.25rem", marginBottom:16 }}>
            <div style={{ fontWeight:700, marginBottom:12 }}>새 챌린지 열기</div>
            <div style={{ display:"flex", flexDirection:"column", gap:6, maxHeight:200, overflowY:"auto", marginBottom:12 }}>
              {ALL_CHALLENGES.map(c => (
                <button key={c.name} onClick={() => setSelectedTemplate(c)}
                  style={{ padding:"10px 14px", borderRadius:10, border:`2px solid ${selectedTemplate?.name === c.name ? "#1D9E75" : "#e8e8e8"}`, background: selectedTemplate?.name === c.name ? "#E1F5EE" : "#fff", textAlign:"left", cursor:"pointer", fontSize:14, fontWeight: selectedTemplate?.name === c.name ? 700 : 400, color: selectedTemplate?.name === c.name ? "#0F6E56" : "#333" }}>
                  {c.icon} {c.name}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:10 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, color:"#888", marginBottom:4 }}>시작일</div>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                  style={{ width:"100%", padding:"8px", borderRadius:8, border:"1px solid #ddd", fontSize:14, boxSizing:"border-box" }} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, color:"#888", marginBottom:4 }}>종료일 (선택)</div>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                  style={{ width:"100%", padding:"8px", borderRadius:8, border:"1px solid #ddd", fontSize:14, boxSizing:"border-box" }} />
              </div>
            </div>
            <button onClick={createChallenge} disabled={!selectedTemplate || creating}
              style={{ width:"100%", padding:"12px", borderRadius:10, border:"none", background: selectedTemplate ? "#1D9E75" : "#ccc", color:"#fff", fontWeight:600, fontSize:15, cursor: selectedTemplate ? "pointer" : "default" }}>
              {creating ? "생성 중..." : "챌린지 열기 🚀"}
            </button>
          </div>

          {/* 챌린지 목록 */}
          <div style={{ fontWeight:700, marginBottom:10 }}>진행 중인 챌린지</div>
          {loading ? <Spinner /> : challenges.map(c => (
            <div key={c.id} onClick={() => { setSelectedChallenge(c); setTab("members"); loadMembersForChallenge(c.id); }}
              style={{ background:"#fff", border:`1.5px solid ${isActive(c) ? "#1D9E75" : "#e8e8e8"}`, borderRadius:14, padding:"1rem 1.25rem", marginBottom:8, cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:14 }}>{c.name}</div>
                  <div style={{ fontSize:12, color:"#888", marginTop:2 }}>{c.start_date} ~ {c.end_date || "무기한"}</div>
                </div>
                <div style={{ padding:"4px 10px", borderRadius:20, background: isActive(c) ? "#E1F5EE" : "#f0f0f0", color: isActive(c) ? "#0F6E56" : "#888", fontSize:12, fontWeight:600 }}>
                  {isActive(c) ? "활성" : "비활성"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 리더 패널 ─────────────────────────────────────────────────────────────────
function LeaderPanel({ userId, challenges, onBack }) {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMembers = async (challengeId) => {
    setLoading(true);
    const { data: memberList } = await supabase.from("challenge_members").select("*").eq("challenge_id", challengeId);
    const { data: records } = await supabase.from("daily_records").select("*").eq("challenge_id", challengeId);
    const { data: completions } = await supabase.from("completions").select("*").eq("challenge_id", challengeId);
    const enriched = (memberList || []).map(m => {
      const myRec = (records || []).filter(r => r.user_id === m.user_id);
      const totalDays = myRec.length;
      const pct = totalDays > 0 ? Math.round(myRec.reduce((a, r) => a + (r.completed_routines / (r.total_routines || 4)), 0) / totalDays * 100) : 0;
      const completion = (completions || []).find(c => c.user_id === m.user_id);
      const todayRec = myRec.find(r => r.record_date === getTodayStr());
      const todayPhotos = todayRec?.routine_photos ? Object.values(todayRec.routine_photos) : [];
      return { ...m, pct, days: totalDays, completion, todayPhotos };
    });
    setMembers(enriched);
    setLoading(false);
  };

  if (selectedChallenge) {
    return (
      <div style={{ minHeight:"100vh", background:"#f7f8fa" }}>
        <div style={{ maxWidth:480, margin:"0 auto", background:"#fff", minHeight:"100vh" }}>
          <div style={{ padding:"1.25rem", display:"flex", alignItems:"center", gap:12, borderBottom:"0.5px solid #e8e8e8" }}>
            <button onClick={() => setSelectedChallenge(null)} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>←</button>
            <div style={{ fontWeight:700, fontSize:16 }}>{selectedChallenge.name}</div>
          </div>
          <div style={{ padding:"1rem 1.25rem" }}>
            <div style={{ fontWeight:600, marginBottom:12 }}>멤버 현황 ({members.length}명)</div>
            {loading ? <Spinner /> : members.map(m => (
              <div key={m.id} style={{ background:"#f7f8fa", borderRadius:14, padding:"1rem", marginBottom:10 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:14 }}>{m.nickname || "참가자"}</div>
                    <div style={{ fontSize:12, color:"#888" }}>{m.days}일 참가 · {m.pct}% 달성</div>
                  </div>
                  {m.completion
                    ? <div style={{ padding:"4px 10px", borderRadius:8, background:"#FAEEDA", color:"#633806", fontSize:12, fontWeight:600 }}>🎁 완료</div>
                    : m.days >= 21 ? <div style={{ padding:"4px 10px", borderRadius:8, background:"#E1F5EE", color:"#0F6E56", fontSize:12, fontWeight:600 }}>✅ 21일달성</div>
                    : null
                  }
                </div>
                <div style={{ height:6, background:"#e8e8e8", borderRadius:3, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${Math.min(m.days/21*100,100)}%`, background:"#1D9E75", borderRadius:3 }} />
                </div>
                <div style={{ fontSize:11, color:"#999", marginTop:4 }}>{m.days}/21일</div>
                {m.todayPhotos.length > 0 && (
                  <div style={{ display:"flex", gap:6, marginTop:8, overflowX:"auto" }}>
                    {m.todayPhotos.map((url, j) => (
                      <img key={j} src={url} alt="인증" style={{ width:70, height:70, borderRadius:8, objectFit:"cover", flexShrink:0 }} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:"#f7f8fa" }}>
      <div style={{ maxWidth:480, margin:"0 auto", background:"#fff", minHeight:"100vh" }}>
        <div style={{ padding:"1.25rem", display:"flex", alignItems:"center", gap:12, borderBottom:"0.5px solid #e8e8e8" }}>
          <button onClick={onBack} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>←</button>
          <div style={{ fontWeight:700, fontSize:18 }}>⭐ 리더 패널</div>
        </div>
        <div style={{ padding:"1rem 1.25rem" }}>
          {challenges.filter(c => isActive(c)).map(c => (
            <div key={c.id} onClick={() => { setSelectedChallenge(c); loadMembers(c.id); }}
              style={{ background:"#fff", border:"1.5px solid #1D9E75", borderRadius:14, padding:"1rem 1.25rem", marginBottom:8, cursor:"pointer" }}>
              <div style={{ fontWeight:600, fontSize:14 }}>{c.name}</div>
              <div style={{ fontSize:12, color:"#888", marginTop:2 }}>멤버 현황 보기 →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 루틴 홈 ──────────────────────────────────────────────────────────────────
function ChallengeHome({ challenge, userId }) {
  const baseRoutines = getRoutinesForChallenge(challenge.name);
  const [routines, setRoutines] = useState(baseRoutines.map(r => ({ ...r, done: false, photoUrl: null })));
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkinTime, setCheckinTime] = useState(null);
  const [saving, setSaving] = useState(false);
  const [celebration, setCelebration] = useState(false);
  const [photoModal, setPhotoModal] = useState(null);
  const today = getTodayStr();

  useEffect(() => {
    supabase.from("daily_records").select("*")
      .eq("challenge_id", challenge.id).eq("user_id", userId).eq("record_date", today)
      .single().then(({ data }) => {
        if (data) {
          setCheckedIn(data.checked_in);
          if (data.checkin_time) setCheckinTime(data.checkin_time);
          const photos = data.routine_photos || {};
          setRoutines(prev => prev.map((r, i) => ({ ...r, done: i < data.completed_routines, photoUrl: photos[r.id] || null })));
        }
      });
  }, [challenge.id, userId, today]);

  const doneCount = routines.filter(r => r.done).length;
  const pct = Math.round((doneCount / routines.length) * 100);
  const elapsed = daysSince(challenge.start_date);
  const progress = Math.min(100, Math.round((elapsed / challenge.duration_days) * 100));

  const saveRecord = useCallback(async (updatedRoutines, ci, ciTime) => {
    setSaving(true);
    const done = updatedRoutines.filter(r => r.done).length;
    const photos = {};
    updatedRoutines.forEach(r => { if (r.photoUrl) photos[r.id] = r.photoUrl; });
    await supabase.from("daily_records").upsert({
      challenge_id: challenge.id, user_id: userId, record_date: today,
      completed_routines: done, total_routines: updatedRoutines.length,
      checked_in: ci, checkin_time: ciTime, routine_photos: photos,
    }, { onConflict: "challenge_id,user_id,record_date" });
    setSaving(false);
  }, [challenge.id, userId, today]);

  const toggleRoutine = (routine) => {
    const wasNotDone = !routine.done;
    const updated = routines.map(r => r.id === routine.id ? { ...r, done: !r.done } : r);
    setRoutines(updated);
    saveRecord(updated, checkedIn, checkinTime);
    if (wasNotDone) setTimeout(() => setPhotoModal(routine), 200);
    if (updated.every(r => r.done) && !celebration) {
      setCelebration(true);
      setTimeout(() => setCelebration(false), 3000);
    }
  };

  const handleCheckin = () => {
    const t = formatTime();
    setCheckedIn(true); setCheckinTime(t);
    saveRecord(routines, true, t);
  };

  const handlePhotoUploaded = (routineId, url) => {
    const updated = routines.map(r => r.id === routineId ? { ...r, photoUrl: url } : r);
    setRoutines(updated);
    saveRecord(updated, checkedIn, checkinTime);
  };

  return (
    <div>
      {celebration && (
        <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", background:"#1D9E75", color:"#fff", padding:"12px 28px", borderRadius:20, fontWeight:700, zIndex:300, fontSize:16 }}>
          🎉 오늘의 루틴 완료!
        </div>
      )}
      {photoModal && (
        <PhotoModal routine={photoModal} userId={userId} challengeId={challenge.id} today={today}
          onClose={() => setPhotoModal(null)} onUploaded={handlePhotoUploaded} />
      )}

      <div style={{ background:"#f7f8fa", borderRadius:16, padding:"1rem 1.25rem", marginBottom:12 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontWeight:700, fontSize:15 }}>{challenge.name}</div>
            <div style={{ fontSize:13, color:"#888", marginTop:2 }}>{elapsed}일째 / 총 21일</div>
          </div>
          <div style={{ background:"#1D9E75", color:"#fff", borderRadius:20, padding:"4px 12px", fontSize:13, fontWeight:600 }}>{progress}% 진행</div>
        </div>
        <div style={{ height:6, background:"#e8e8e8", borderRadius:3, marginTop:10, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${progress}%`, background:"#1D9E75", borderRadius:3 }} />
        </div>
      </div>

      <div style={{ background: checkedIn ? "#E1F5EE" : "#fff", border:"0.5px solid #e8e8e8", borderRadius:16, padding:"1rem 1.25rem", marginBottom:12 }}>
        <div style={{ fontSize:12, color:"#888" }}>오늘</div>
        <div style={{ fontSize:20, fontWeight:700 }}>{formatDate()}</div>
        {checkinTime
          ? <div style={{ fontSize:13, color:"#1D9E75", marginTop:4 }}>✓ {checkinTime} 기상 체크인 완료</div>
          : <button onClick={handleCheckin} style={{ marginTop:10, width:"100%", padding:"10px", borderRadius:10, border:"none", background:"#1D9E75", color:"#fff", fontWeight:600, fontSize:15, cursor:"pointer" }}>🌅 기상 체크인</button>
        }
      </div>

      <div style={{ background:"#f7f8fa", borderRadius:16, padding:"0.875rem 1.25rem", marginBottom:12 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
          <span style={{ fontWeight:600, fontSize:14 }}>오늘 루틴</span>
          <span style={{ fontSize:14, color:"#888" }}>{doneCount} / {routines.length}</span>
        </div>
        <div style={{ height:8, background:"#e8e8e8", borderRadius:4, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${pct}%`, background:"#1D9E75", borderRadius:4, transition:"width 0.4s" }} />
        </div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {routines.map((r, i) => (
          <div key={r.id} style={{ borderRadius:16, overflow:"hidden", border:`1.5px solid ${r.done && r.photoUrl ? "#1D9E75" : "#e8e8e8"}` }}>
            <div style={{ background: r.done ? "#f7f8fa" : "#fff", padding:"0.875rem 1.25rem", display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:COLORS[i%COLORS.length], display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{r.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, fontSize:15 }}>{r.name}</div>
                <div style={{ fontSize:12, color:"#888", marginTop:2, display:"flex", gap:6 }}>
                  ⏱ {r.duration}분
                  {r.done && !r.photoUrl && <span style={{ color:"#f59e0b" }}>· 사진 미제출</span>}
                  {r.photoUrl && <span style={{ color:"#1D9E75" }}>· 📸 인증완료</span>}
                </div>
              </div>
              {r.done && !r.photoUrl && (
                <button onClick={() => setPhotoModal(r)} style={{ background:"#fff7ed", border:"1px solid #fed7aa", borderRadius:8, padding:"6px 10px", fontSize:13, color:"#c2410c", cursor:"pointer", flexShrink:0 }}>📷 인증</button>
              )}
              <button onClick={() => toggleRoutine(r)} style={{ width:30, height:30, borderRadius:"50%", border:"none", background: r.done ? "#1D9E75" : "transparent", outline: r.done ? "none" : "1.5px solid #ccc", color:"#fff", fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                {r.done ? "✓" : ""}
              </button>
            </div>
            {r.photoUrl && <img src={r.photoUrl} alt="인증" style={{ width:"100%", maxHeight:180, objectFit:"cover", display:"block" }} />}
          </div>
        ))}
      </div>
      {saving && <div style={{ textAlign:"center", color:"#999", fontSize:12, marginTop:12 }}>저장 중...</div>}
    </div>
  );
}

// ── 리더보드 ─────────────────────────────────────────────────────────────────
function Leaderboard({ challenge }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = getTodayStr();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data: memberList } = await supabase.from("challenge_members").select("*").eq("challenge_id", challenge.id);
      const { data: records } = await supabase.from("daily_records").select("*").eq("challenge_id", challenge.id);
      const routines = getRoutinesForChallenge(challenge.name);
      const enriched = (memberList || []).map(m => {
        const myRec = (records || []).filter(r => r.user_id === m.user_id);
        const totalPct = myRec.length > 0 ? Math.round(myRec.reduce((a, r) => a + (r.completed_routines / (r.total_routines || routines.length)), 0) / myRec.length * 100) : 0;
        const todayRec = myRec.find(r => r.record_date === today);
        const todayPct = todayRec ? Math.round((todayRec.completed_routines / (todayRec.total_routines || routines.length)) * 100) : 0;
        const todayPhotos = todayRec?.routine_photos ? Object.values(todayRec.routine_photos) : [];
        let streak = 0;
        const dates = myRec.map(r => r.record_date).sort().reverse();
        const d = new Date(); d.setHours(0,0,0,0);
        for (let i = 0; i < 100; i++) {
          const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
          d.setDate(d.getDate() - 1);
          if (dates.includes(key)) streak++; else break;
        }
        return { ...m, totalPct, todayPct, streak, totalDays: myRec.length, todayPhotos };
      });
      enriched.sort((a, b) => b.totalPct - a.totalPct || b.streak - a.streak);
      setMembers(enriched);
      setLoading(false);
    }
    load();
  }, [challenge.id, today]);

  if (loading) return <Spinner />;
  const medals = ["🥇","🥈","🥉"];
  const routines = getRoutinesForChallenge(challenge.name);

  return (
    <div>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontWeight:700, fontSize:16, marginBottom:4 }}>리더보드</div>
        <div style={{ fontSize:13, color:"#888" }}>전체 기간 달성률 기준</div>
      </div>
      {members.length === 0 && <div style={{ textAlign:"center", color:"#bbb", padding:"2rem" }}>아직 기록이 없어요 🌅</div>}
      {members.map((m, i) => (
        <div key={m.id} style={{ background: i===0 ? "#FAEEDA" : "#fff", border:`0.5px solid ${i===0 ? "#FAC775" : "#e8e8e8"}`, borderRadius:16, padding:"1rem 1.25rem", marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ fontSize:24, width:30, textAlign:"center" }}>{medals[i] || `${i+1}`}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:15 }}>{m.nickname || "참가자"} {m.role==="leader" ? "⭐" : ""}</div>
              <div style={{ display:"flex", gap:8, marginTop:4, flexWrap:"wrap" }}>
                <span style={{ fontSize:12, color:"#888" }}>🔥 {m.streak}일</span>
                <span style={{ fontSize:12, color:"#888" }}>📅 {m.totalDays}/21일</span>
                <span style={{ fontSize:12, color:"#1D9E75" }}>오늘 {m.todayPct}%</span>
                <span style={{ fontSize:12, color:"#888" }}>📸 {m.todayPhotos.length}/{routines.length}</span>
              </div>
            </div>
            <div style={{ fontSize:22, fontWeight:700, color: i===0 ? "#633806" : "#1D9E75" }}>{m.totalPct}%</div>
          </div>
          {m.todayPhotos.length > 0 && (
            <div style={{ display:"flex", gap:6, marginTop:10, overflowX:"auto", paddingBottom:4 }}>
              {m.todayPhotos.map((url, j) => (
                <img key={j} src={url} alt="인증" style={{ width:90, height:90, borderRadius:10, objectFit:"cover", flexShrink:0 }} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── 챌린지 정보 ──────────────────────────────────────────────────────────────
function ChallengeInfo({ challenge, userId, onLeave }) {
  const [copied, setCopied] = useState(false);
  const inviteUrl = `${window.location.origin}?code=${challenge.invite_code}`;
  const copyLink = () => {
    navigator.clipboard.writeText(inviteUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <div>
      <div style={{ background:"#f7f8fa", borderRadius:16, padding:"1.25rem", marginBottom:12 }}>
        <div style={{ fontWeight:700, fontSize:15, marginBottom:8 }}>{challenge.name}</div>
        <div style={{ display:"flex", gap:20 }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontWeight:700, fontSize:22, color:"#1D9E75" }}>21</div>
            <div style={{ fontSize:12, color:"#888" }}>총 기간</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontWeight:700, fontSize:22, color:"#1D9E75" }}>{daysSince(challenge.start_date)}</div>
            <div style={{ fontSize:12, color:"#888" }}>진행일</div>
          </div>
        </div>
      </div>
      <div style={{ background:"#fff", border:"0.5px solid #e8e8e8", borderRadius:16, padding:"1.25rem", marginBottom:12 }}>
        <div style={{ fontWeight:600, marginBottom:10 }}>👥 친구 초대</div>
        <div style={{ background:"#f7f8fa", borderRadius:10, padding:"12px 16px", marginBottom:10, textAlign:"center" }}>
          <div style={{ fontSize:12, color:"#888", marginBottom:6 }}>초대 코드</div>
          <div style={{ fontSize:24, fontWeight:700, letterSpacing:4, color:"#1D9E75" }}>{challenge.invite_code}</div>
        </div>
        <button onClick={copyLink} style={{ width:"100%", padding:"11px", borderRadius:10, border:"none", background:"#1D9E75", color:"#fff", fontWeight:600, fontSize:15, cursor:"pointer" }}>
          {copied ? "✓ 링크 복사됨!" : "🔗 초대 링크 복사"}
        </button>
      </div>
      <button onClick={onLeave} style={{ width:"100%", padding:"11px", borderRadius:10, border:"none", background:"#fee2e2", color:"#991b1b", fontWeight:500, fontSize:15, cursor:"pointer" }}>
        챌린지 나가기
      </button>
    </div>
  );
}

// ── 챌린지 상세 ──────────────────────────────────────────────────────────────
function ChallengeDetail({ challenge, userId, userRole, onBack }) {
  const [tab, setTab] = useState("home");
  const handleLeave = async () => {
    if (!window.confirm("챌린지에서 나가시겠어요?")) return;
    await supabase.from("challenge_members").delete().eq("challenge_id", challenge.id).eq("user_id", userId);
    onBack();
    window.location.reload();
  };
  const tabs = [{ key:"home", label:"루틴", icon:"🏠" }, { key:"board", label:"순위", icon:"🏆" }, { key:"info", label:"정보", icon:"⚙️" }];

  return (
    <div style={{ minHeight:"100vh", background:"#f7f8fa" }}>
      <div style={{ maxWidth:420, margin:"0 auto", background:"#fff", minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"1.25rem 1.25rem 0", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={onBack} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>←</button>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:15 }}>{challenge.name}</div>
            <div style={{ fontSize:12, color:"#888" }}>{daysSince(challenge.start_date)}일째 {userRole === "leader" ? "⭐ 리더" : ""}</div>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"1rem 1.25rem 5rem" }}>
          {tab === "home" && <ChallengeHome challenge={challenge} userId={userId} />}
          {tab === "board" && <Leaderboard challenge={challenge} />}
          {tab === "info" && <ChallengeInfo challenge={challenge} userId={userId} onLeave={handleLeave} />}
        </div>
        <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:420, background:"#fff", borderTop:"0.5px solid #e8e8e8", display:"flex", justifyContent:"space-around", padding:"10px 0 16px" }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4, color: tab===t.key ? "#1D9E75" : "#bbb", fontWeight: tab===t.key ? 700 : 400, fontSize:11 }}>
              <span style={{ fontSize:24 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 참가자 챌린지 목록 ────────────────────────────────────────────────────────
function ChallengeList({ userId, userEmail, onSelect }) {
  const [myChallenges, setMyChallenges] = useState([]);
  const [allChallenges, setAllChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState(new URLSearchParams(window.location.search).get("code") || "");
  const [nickname, setNickname] = useState("");
  const [codeError, setCodeError] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLeader, setShowLeader] = useState(false);
  const isAdmin = userEmail === ADMIN_EMAIL;

  const load = useCallback(async () => {
    setLoading(true);
    const { data: memberships } = await supabase.from("challenge_members").select("challenge_id, role, challenges(*)").eq("user_id", userId);
    const myList = (memberships || []).map(m => ({ ...m.challenges, myRole: m.role })).filter(Boolean);
    setMyChallenges(myList);

    const { data: all } = await supabase.from("challenges").select("*").order("start_date", { ascending: false });
    setAllChallenges(all || []);
    setLoading(false);
  }, [userId]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("code");
    if (c) setShowCodeInput(true);
  }, []);

  const joinWithCode = async () => {
    if (!code.trim()) { setCodeError("코드를 입력해주세요"); return; }
    setCodeLoading(true); setCodeError("");
    const { data: activationCode } = await supabase.from("activation_codes").select("*, challenges(*)").eq("code", code.trim().toUpperCase()).single();
    if (!activationCode) { setCodeError("유효하지 않은 코드예요"); setCodeLoading(false); return; }
    const challenge = activationCode.challenges;
    if (!challenge) { setCodeError("챌린지를 찾을 수 없어요"); setCodeLoading(false); return; }
    if (!isActive(challenge)) { setCodeError("현재 진행 중인 챌린지가 아니에요"); setCodeLoading(false); return; }
    const already = myChallenges.find(c => c.id === challenge.id);
    if (already) { setCodeError("이미 참가한 챌린지예요"); setCodeLoading(false); return; }
    await supabase.from("challenge_members").insert({ challenge_id: challenge.id, user_id: userId, nickname: nickname.trim() || "참가자", role: "member" });
    await supabase.from("activation_codes").update({ use_count: (activationCode.use_count || 0) + 1 }).eq("id", activationCode.id);
    setShowCodeInput(false); setCode(""); setNickname("");
    window.history.replaceState({}, "", "/");
    load();
  };

  const isLeader = myChallenges.some(c => c.myRole === "leader");

  if (loading) return <Spinner />;
  if (showAdmin && isAdmin) return <AdminPanel userId={userId} onBack={() => { setShowAdmin(false); load(); }} />;
  if (showLeader) return <LeaderPanel userId={userId} challenges={allChallenges} onBack={() => setShowLeader(false)} />;

  return (
    <div style={{ minHeight:"100vh", background:"#f7f8fa", padding:"1.5rem 1rem 2rem" }}>
      <div style={{ maxWidth:420, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", marginBottom:20 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:22, fontWeight:700 }}>🌿 미라클 아로마</div>
            <div style={{ fontSize:13, color:"#888", marginTop:2 }}>21일 챌린지 인증</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {isLeader && (
              <button onClick={() => setShowLeader(true)} style={{ padding:"8px 12px", borderRadius:10, border:"none", background:"#EEEDFE", color:"#534AB7", fontWeight:600, fontSize:13, cursor:"pointer" }}>⭐ 리더</button>
            )}
            {isAdmin && (
              <button onClick={() => setShowAdmin(true)} style={{ padding:"8px 12px", borderRadius:10, border:"none", background:"#FAEEDA", color:"#633806", fontWeight:600, fontSize:13, cursor:"pointer" }}>👑 관리</button>
            )}
          </div>
        </div>

        <button onClick={() => setShowCodeInput(true)} style={{ width:"100%", padding:"13px", borderRadius:14, border:"none", background:"#1D9E75", color:"#fff", fontWeight:700, fontSize:16, cursor:"pointer", marginBottom:20 }}>
          + 코드로 챌린지 참가하기
        </button>

        {showCodeInput && (
          <div style={{ background:"#fff", borderRadius:16, padding:"1.25rem", marginBottom:20, border:"1.5px solid #1D9E75" }}>
            <div style={{ fontWeight:700, marginBottom:12 }}>챌린지 코드 입력</div>
            {codeError && <div style={{ color:"#dc2626", fontSize:13, marginBottom:8 }}>{codeError}</div>}
            <input value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="코드 입력 (예: AB12CD34)"
              style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1px solid #ddd", fontSize:16, letterSpacing:3, textAlign:"center", marginBottom:10, boxSizing:"border-box" }} />
            <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="닉네임 (선택)"
              style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1px solid #ddd", fontSize:15, marginBottom:12, boxSizing:"border-box" }} />
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={joinWithCode} disabled={codeLoading}
                style={{ flex:1, padding:"11px", borderRadius:10, border:"none", background:"#1D9E75", color:"#fff", fontWeight:600, fontSize:15, cursor:"pointer" }}>
                {codeLoading ? "확인 중..." : "참가하기"}
              </button>
              <button onClick={() => { setShowCodeInput(false); setCodeError(""); }}
                style={{ flex:1, padding:"11px", borderRadius:10, border:"1px solid #ddd", background:"transparent", fontWeight:500, fontSize:15, cursor:"pointer" }}>취소</button>
            </div>
          </div>
        )}

        {/* 내 챌린지 */}
        {myChallenges.length > 0 && (
          <div>
            <div style={{ fontWeight:700, marginBottom:10, fontSize:15 }}>내 챌린지</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
              {myChallenges.map(c => {
                const elapsed = daysSince(c.start_date);
                const pct = Math.min(100, Math.round((elapsed / 21) * 100));
                const active = isActive(c);
                return (
                  <div key={c.id} style={{ background:"#fff", border:`1.5px solid ${active ? "#1D9E75" : "#e8e8e8"}`, borderRadius:16, padding:"1.25rem", position:"relative" }}>
                    <div onClick={() => active && onSelect(c, c.myRole)} style={{ cursor: active ? "pointer" : "default", opacity: active ? 1 : 0.6 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                        <div style={{ flex:1, paddingRight:8 }}>
                          <div style={{ fontWeight:700, fontSize:14 }}>{c.name}</div>
                          <div style={{ fontSize:12, color:"#888", marginTop:2 }}>{elapsed}일째 / 21일 {c.myRole === "leader" ? "· ⭐ 리더" : ""}</div>
                        </div>
                        <div style={{ padding:"4px 10px", borderRadius:20, background: active ? "#E1F5EE" : "#f0f0f0", color: active ? "#0F6E56" : "#888", fontSize:12, fontWeight:600 }}>
                          {active ? `${pct}%` : "🔒 종료"}
                        </div>
                      </div>
                      <div style={{ height:5, background:"#f0f0f0", borderRadius:3, marginTop:10, overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${pct}%`, background:"#1D9E75", borderRadius:3 }} />
                      </div>
                    </div>
                    <button onClick={async (e) => {
                      e.stopPropagation();
                      if (!window.confirm("챌린지 목록에서 삭제할까요?")) return;
                      await supabase.from("challenge_members").delete().eq("challenge_id", c.id).eq("user_id", userId);
                      load();
                    }} style={{ position:"absolute", top:10, right:10, background:"none", border:"none", color:"#ccc", fontSize:18, cursor:"pointer", lineHeight:1, padding:"4px" }}>✕</button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 전체 챌린지 목록 */}
        <div style={{ fontWeight:700, marginBottom:10, fontSize:15 }}>전체 챌린지 프로그램</div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {ALL_CHALLENGES.map((c, i) => {
            const opened = allChallenges.find(ac => ac.name === c.name);
            const active = opened && isActive(opened);
            const joined = myChallenges.find(mc => mc.name === c.name);
            return (
              <div key={c.name} style={{ background:"#fff", border:"0.5px solid #e8e8e8", borderRadius:14, padding:"0.875rem 1.25rem", display:"flex", alignItems:"center", gap:12, opacity: active ? 1 : 0.5 }}>
                <div style={{ fontSize:24 }}>{c.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:13 }}>{c.name}</div>
                  <div style={{ fontSize:11, color:"#888", marginTop:2 }}>
                    {active ? "🟢 진행 중" : opened ? "🔒 종료됨" : "⏳ 준비 중"}
                    {joined ? " · ✓ 참가중" : ""}
                  </div>
                </div>
                {!active && <div style={{ fontSize:20 }}>🔒</div>}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign:"center", marginTop:20 }}>
          <button onClick={() => supabase.auth.signOut()} style={{ background:"none", border:"none", color:"#bbb", fontSize:13, cursor:"pointer" }}>로그아웃</button>
        </div>
      </div>
    </div>
  );
}

// ── 메인 ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [userRole, setUserRole] = useState("member");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => { setSession(s); setLoading(false); });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}><Spinner /></div>;
  if (!session) return <LoginScreen />;
  if (selectedChallenge) return (
    <ChallengeDetail
      challenge={selectedChallenge}
      userId={session.user.id}
      userRole={userRole}
      onBack={() => setSelectedChallenge(null)}
    />
  );
  return (
    <ChallengeList
      userId={session.user.id}
      userEmail={session.user.email}
      onSelect={(c, role) => { setSelectedChallenge(c); setUserRole(role || "member"); }}
    />
  );
}
