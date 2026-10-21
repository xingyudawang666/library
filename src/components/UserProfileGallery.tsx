import React, { useState } from 'react';
import {
  Bookmark,
  Award,
  Sparkles,
  Palette,
  Eye,
  Trash2,
  Share2,
  MessageSquare,
  ThumbsUp,
  Send,
  CloudCheck,
  HardDrive,
  Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MURALS, Mural, INITIAL_COMMENTS } from '../data/dunhuangData';
import { ArtPassportModal } from './ArtPassportModal';

interface UserProfileGalleryProps {
  onSelectMuralForZoom: (muralId: string) => void;
}

export const UserProfileGallery: React.FC<UserProfileGalleryProps> = ({ onSelectMuralForZoom }) => {
  const { user, language, toggleFavorite, isFavorite, saveNote, isOffline } = useApp();
  const [activeTab, setActiveTab] = useState<'favorites' | 'artworks' | 'community'>('favorites');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');
  const [shareMural, setShareMural] = useState<Mural | null>(null);

  // Community comments state
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentMural, setNewCommentMural] = useState('mural-deer');

  const favoriteMurals = MURALS.filter(m => user.favorites.includes(m.id));

  const handleSaveNote = (muralId: string) => {
    saveNote(muralId, tempNote);
    setEditingNoteId(null);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newC = {
      id: `c-${Date.now()}`,
      muralId: newCommentMural,
      userName: user.name,
      avatar: user.avatar,
      titleBadge: user.title,
      timestamp: '刚刚',
      likes: 1,
      content: newCommentText.trim()
    };

    setComments([newC, ...comments]);
    setNewCommentText('');
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prev =>
      prev.map(c => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <div className="relative min-h-[92vh] bg-[#140e0b] text-[#f4ede1] p-4 md:p-8 flex flex-col items-center">
      {/* User Header Profile Card */}
      <div className="w-full max-w-5xl p-6 rounded-2xl bg-[#1e1510] border border-[#3d2c1e] shadow-xl mb-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full border-2 border-[#d4a359] shadow-lg object-cover"
          />
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl md:text-2xl font-serif-sc font-bold text-[#f5ecd9]">{user.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#3b2718] border border-[#d4a359]/40 text-xs text-[#e5b869] font-serif">
                {user.title}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#a3907d]">
              {language === 'zh'
                ? '已收录莫高珍品壁画 · 专属文化图鉴与修习档案'
                : 'Dunhuang Cultural Curator & Digital Guardian'}
            </p>

            {/* Cultural Passport Stamp Badges */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="px-2.5 py-1 rounded bg-[#291e16] border border-[#b83b2a] text-[#b83b2a] text-[11px] font-serif flex items-center gap-1 shadow-sm">
                <span>印</span>
                <span>北魏本生印</span>
              </div>
              <div className="px-2.5 py-1 rounded bg-[#291e16] border border-[#d4a359] text-[#e5b869] text-[11px] font-serif flex items-center gap-1 shadow-sm">
                <span>印</span>
                <span>盛唐乐舞印</span>
              </div>
              <div className="px-2.5 py-1 rounded bg-[#291e16] border border-[#2e6355] text-[#4ea88c] text-[11px] font-serif flex items-center gap-1 shadow-sm">
                <span>印</span>
                <span>隋代三兔印</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sync & Offline Status */}
        <div className="flex flex-col items-center sm:items-end gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#291e16] border border-[#3d2c1e]">
            {isOffline ? (
              <>
                <HardDrive className="w-4 h-4 text-[#e5b869]" />
                <span className="text-[#e5b869]">{language === 'zh' ? '离线模式激活 (已缓存)' : 'Offline Cache Active'}</span>
              </>
            ) : (
              <>
                <CloudCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">{language === 'zh' ? '跨平台云端同步完成' : 'Synced across devices'}</span>
              </>
            )}
          </div>
          <span className="text-[10px] text-[#8c7866]">
            {language === 'zh' ? `已珍藏 ${user.favorites.length} 幅壁画 · 创作 ${user.createdArtworks.length} 幅矿彩` : `${user.favorites.length} Bookmarks`}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-5xl flex items-center justify-center sm:justify-start gap-2 mb-6 border-b border-[#38281d] pb-2">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2 rounded-xl text-xs font-serif flex items-center gap-1.5 transition-colors ${
            activeTab === 'favorites' ? 'bg-[#d4a359] text-[#18110b] font-bold shadow' : 'text-[#c9b7a1] hover:text-white'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>{language === 'zh' ? `我的壁画珍藏 (${user.favorites.length})` : `Favorites (${user.favorites.length})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('artworks')}
          className={`px-4 py-2 rounded-xl text-xs font-serif flex items-center gap-1.5 transition-colors ${
            activeTab === 'artworks' ? 'bg-[#d4a359] text-[#18110b] font-bold shadow' : 'text-[#c9b7a1] hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>{language === 'zh' ? `矿彩创作集 (${user.createdArtworks.length})` : `My Artworks (${user.createdArtworks.length})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('community')}
          className={`px-4 py-2 rounded-xl text-xs font-serif flex items-center gap-1.5 transition-colors ${
            activeTab === 'community' ? 'bg-[#d4a359] text-[#18110b] font-bold shadow' : 'text-[#c9b7a1] hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{language === 'zh' ? '莫高鉴赏交流社群' : 'Community Discussion'}</span>
        </button>
      </div>

      {/* Tab 1: Favorites Gallery */}
      {activeTab === 'favorites' && (
        <div className="w-full max-w-5xl">
          {favoriteMurals.length === 0 ? (
            <div className="text-center py-16 text-[#8c7866] text-xs">
              {language === 'zh' ? '暂未收藏壁画。在微距鉴赏或VR洞窟中轻触书签图标即可收藏！' : 'No saved murals yet.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteMurals.map(mural => (
                <div
                  key={mural.id}
                  className="bg-[#1e1510] border border-[#3d2c1e] rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden group">
                      <img
                        src={mural.imageUrl}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] text-[#e5b869] font-serif">
                        {mural.caveNumber}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif-sc font-bold text-sm text-[#f5ecd9]">
                          {mural.title[language] || mural.title['zh']}
                        </h4>
                        <span className="text-[10px] text-[#99836c]">
                          {mural.dynasty[language] || mural.dynasty['zh']}
                        </span>
                      </div>

                      {/* User Study Note */}
                      <div className="mt-3 p-2.5 rounded-lg bg-[#140e0b] border border-[#38281d] text-[11px] text-[#c9b7a1]">
                        {editingNoteId === mural.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={tempNote}
                              onChange={(e) => setTempNote(e.target.value)}
                              rows={2}
                              className="w-full bg-[#1e1510] border border-[#4d3828] rounded p-1.5 text-xs text-white outline-none"
                              placeholder="撰写您的鉴赏札记..."
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setEditingNoteId(null)}
                                className="px-2 py-0.5 text-[10px] text-[#8c7866]"
                              >
                                取消
                              </button>
                              <button
                                onClick={() => handleSaveNote(mural.id)}
                                className="px-2.5 py-0.5 rounded bg-[#d4a359] text-[#18110b] font-bold text-[10px]"
                              >
                                保存
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-2">
                            <p className="italic text-[#99836c] leading-relaxed">
                              {user.notes[mural.id] || (language === 'zh' ? '暂无札记。点击右侧笔图标添加个人鉴赏随笔。' : 'No study notes.')}
                            </p>
                            <button
                              onClick={() => {
                                setEditingNoteId(mural.id);
                                setTempNote(user.notes[mural.id] || '');
                              }}
                              className="text-[#d4a359] hover:text-white text-[10px] flex-shrink-0"
                            >
                              编辑
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-3 bg-[#18110c] border-t border-[#38281d] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectMuralForZoom(mural.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#291e16] hover:bg-[#382a1f] text-xs text-[#e5b869] flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === 'zh' ? '微距鉴赏' : 'Deep Zoom'}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setShareMural(mural)}
                        className="p-1.5 rounded-lg text-[#d4a359] hover:bg-[#291e16]"
                        title="生成专属艺术图鉴"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleFavorite(mural.id)}
                        className="p-1.5 rounded-lg text-[#8c7866] hover:text-rose-400"
                        title="移出收藏"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: User Artworks Gallery */}
      {activeTab === 'artworks' && (
        <div className="w-full max-w-5xl">
          {user.createdArtworks.length === 0 ? (
            <div className="text-center py-16 text-[#8c7866] text-xs">
              {language === 'zh' ? '暂无创作。请前往【非遗矿彩工坊】亲手绘制壁画并保存！' : 'No custom paintings yet.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.createdArtworks.map(art => (
                <div
                  key={art.id}
                  className="bg-[#1e1510] border border-[#3d2c1e] rounded-2xl overflow-hidden shadow-lg p-3"
                >
                  <img src={art.dataUrl} alt="" className="w-full h-56 object-contain rounded-xl bg-[#efe3ce]" />
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif-sc font-bold text-sm text-[#f5ecd9]">{art.title}</h4>
                      <span className="text-[10px] text-[#99836c]">{art.date}</span>
                    </div>
                    <a
                      href={art.dataUrl}
                      download={`${art.title}.png`}
                      className="p-2 rounded-lg bg-[#291e16] text-[#e5b869] hover:bg-[#382a1f]"
                      title="下载"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Community Discussion Feed */}
      {activeTab === 'community' && (
        <div className="w-full max-w-3xl space-y-6">
          {/* Post New Comment */}
          <form
            onSubmit={handleAddComment}
            className="p-4 rounded-2xl bg-[#1e1510] border border-[#3d2c1e] shadow-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-[#e5b869] font-serif">{language === 'zh' ? '关联讨论壁画：' : 'Mural:'}</span>
              <select
                value={newCommentMural}
                onChange={(e) => setNewCommentMural(e.target.value)}
                className="bg-[#140e0b] border border-[#38281d] rounded-lg px-2.5 py-1 text-xs text-[#f5ecd9] outline-none"
              >
                {MURALS.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.caveNumber} · {m.title.zh}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              rows={3}
              placeholder={language === 'zh' ? '分享您对莫高窟壁画、线条、设色或历史故事的独到见解……' : 'Share your cultural insight...'}
              className="w-full bg-[#140e0b] border border-[#38281d] focus:border-[#d4a359] rounded-xl p-3 text-xs md:text-sm text-white placeholder-[#73604f] outline-none"
            />

            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="px-4 py-2 rounded-xl bg-[#d4a359] hover:bg-[#e5b869] disabled:opacity-50 text-[#18110b] font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{language === 'zh' ? '发表鉴赏心得' : 'Post Insight'}</span>
              </button>
            </div>
          </form>

          {/* Comments Feed List */}
          <div className="space-y-4">
            {comments.map(c => {
              const muralTarget = MURALS.find(m => m.id === c.muralId);
              return (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl bg-[#1e1510] border border-[#3d2c1e] shadow-md flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-[#d4a359]/40" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif-sc font-bold text-xs text-[#f5ecd9]">{c.userName}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#291e16] text-[#e5b869] font-serif">
                            {c.titleBadge}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#7a6857]">{c.timestamp}</span>
                      </div>
                    </div>

                    {muralTarget && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#140e0b] text-[#c9b7a1] border border-[#38281d]">
                        {muralTarget.caveNumber}
                      </span>
                    )}
                  </div>

                  <p className="text-xs md:text-sm text-[#ded2c1] leading-relaxed">
                    {c.content}
                  </p>

                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#33251a]">
                    <button
                      onClick={() => handleLikeComment(c.id)}
                      className="flex items-center gap-1.5 text-xs text-[#a3907d] hover:text-[#e5b869] transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{c.likes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal for Passport Sharing if opened */}
      {shareMural && (
        <ArtPassportModal mural={shareMural} onClose={() => setShareMural(null)} />
      )}
    </div>
  );
};
