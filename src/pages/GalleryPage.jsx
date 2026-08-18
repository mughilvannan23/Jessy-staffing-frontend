import React, { useState, useEffect } from 'react';
import API from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';
import Loader from '../components/Loader';

const GalleryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewImage, setPreviewImage] = useState(null);

  const DEFAULT_CATEGORIES = ['School', 'Healthcare', 'Security', 'Corporate', 'Home Care'];
  const categories = ['All', ...Array.from(new Set([...DEFAULT_CATEGORIES, ...items.map(i => i.category).filter(Boolean)]))];

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const url = selectedCategory === 'All' ? '/gallery' : `/gallery?category=${selectedCategory}`;
        const res = await API.get(url);
        if (res.data.success) {
          setItems(res.data.items);
        }
      } catch (err) {
        console.error('Gallery fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [selectedCategory]);

  return (
    <div className="gallery-page pt-5">
      <Breadcrumbs title="Photo & Deployment Gallery" />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold mb-2">VISUAL SHOWCASE</span>
            <h1 className="display-5 fw-extrabold text-navy">Our Workforce In Action</h1>
            <p className="text-muted">
              Browse photo documentation from active school classrooms, hospital ICUs, asset security posts, and corporate HR consultation operations.
            </p>
          </div>

          {/* CATEGORY FILTER TABS */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn rounded-pill px-4 py-2 small fw-bold transition-all ${
                  selectedCategory === cat
                    ? 'btn-primary-custom'
                    : 'btn-outline-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* GALLERY GRID */}
          {loading ? (
            <Loader />
          ) : items.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-images display-3 d-block mb-3"></i>
              <p>No gallery images uploaded for category "{selectedCategory}".</p>
            </div>
          ) : (
            <div className="row g-4">
              {items.map((item) => (
                <div key={item._id} className="col-lg-4 col-md-6">
                  <div
                    className="card-hover-lift rounded-4 overflow-hidden shadow-sm cursor-pointer position-relative group"
                    onClick={() => setPreviewImage(item)}
                  >
                    <div style={{ height: '260px' }}>
                      <img src={item.image} alt={item.title} className="w-100 h-100 object-fit-cover" />
                    </div>

                    <div className="p-4 bg-white border-top">
                      <span className="badge bg-soft-primary text-primary rounded-pill px-2 py-1 fs-7 mb-1">
                        {item.category}
                      </span>
                      <h5 className="fw-bold text-navy mb-1">{item.title}</h5>
                      {item.description && <p className="text-muted small mb-0 line-clamp-2">{item.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX PREVIEW MODAL */}
      {previewImage && (
        <div className="modal fade show d-block bg-dark bg-opacity-75" tabIndex="-1" onClick={() => setPreviewImage(null)}>
          <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content rounded-4 border-0 overflow-hidden bg-black text-white">
              <div className="modal-header border-bottom border-secondary">
                <h5 className="modal-title fw-bold">{previewImage.title}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setPreviewImage(null)}></button>
              </div>
              <div className="modal-body p-0 text-center">
                <img src={previewImage.image} alt={previewImage.title} className="img-fluid" style={{ maxHeight: '75vh' }} />
              </div>
              <div className="modal-footer border-top border-secondary">
                <p className="small text-light opacity-75 mb-0">{previewImage.description || previewImage.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
