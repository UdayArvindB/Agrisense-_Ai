import React, { useState, useEffect } from 'react';
import { KnowledgeCategory, KnowledgeDocument } from '../types/knowledge';
import { searchKnowledge } from '../services/api';
import { DocumentViewerModal } from '../components/knowledge/DocumentViewerModal';
import { DemoBadge } from '../components/common/DemoBadge';
import {
  Search,
  BookOpen,
  Filter,
  FileText,
  ShieldCheck,
  Clock,
  ChevronRight,
  ExternalLink,
  Layers,
} from 'lucide-react';

export const KnowledgeHubPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDocument | null>(null);
  const [loading, setLoading] = useState(false);

  const categories: KnowledgeCategory[] = [
    'All',
    'Crop Diseases',
    'Soil Management',
    'Irrigation',
    'Fertilizers',
    'Pest Management',
    'Weather',
    'Government Schemes',
    'Crop Management',
  ];

  useEffect(() => {
    let isCurrent = true;
    const fetchDocs = async () => {
      setLoading(true);
      const docs = await searchKnowledge(searchQuery, selectedCategory);
      if (isCurrent) {
        setDocuments(docs);
        setLoading(false);
      }
    };
    fetchDocs();
    return () => {
      isCurrent = false;
    };
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2">
            <DemoBadge variant="pill" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            Agricultural Knowledge Hub
          </h1>

          <p className="text-base sm:text-lg text-stone-600">
            Search our indexed repository of verified agronomic manuals, university extension advisories, and government research papers that ground AgriSense AI’s RAG pipeline.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search agricultural knowledge, diseases, irrigation, fertilizers..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-stone-200/90 shadow-md shadow-stone-900/5 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900 text-sm font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700 bg-stone-100 px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-md shadow-emerald-950/15'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Showing {documents.length} Indexed Reference Documents
            </span>
            <span className="text-xs text-stone-500">Category: {selectedCategory}</span>
          </div>

          {loading ? (
            <div className="text-center py-20 text-stone-500 text-sm">
              Searching agricultural vector corpus...
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
              <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-stone-800">No documents found</h3>
              <p className="text-xs text-stone-500 mt-1">Try adjusting your search terms or filter category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm hover:shadow-card-hover hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {doc.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-stone-500">
                        <Clock className="w-3 h-3" /> {doc.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-stone-900 mb-2 leading-snug group-hover:text-emerald-800 transition-colors">
                      {doc.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                      {doc.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {doc.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                      <span className="text-[11px] font-semibold text-stone-700 block truncate">
                        {doc.source}
                      </span>
                      <span className="text-[10px] text-stone-400 block truncate">
                        {doc.date}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shrink-0"
                    >
                      <span>Read</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Full Document Viewer Modal */}
        <DocumentViewerModal
          document={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      </div>
    </div>
  );
};
