import "./InfiniteGallery.css";
import galleryItems from "../data/gallery";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function InfiniteGallery() {
  const firstRow = [...galleryItems, ...galleryItems];
  const secondRow = [...galleryItems].reverse();
  const secondLoop = [...secondRow, ...secondRow];
    const navigate = useNavigate();

  return (
    <section className="gallery-section">

      <div className="gallery-heading">

        <span>OUR CREATIONS</span>

        <h2>
          Crafted with Elegance.
          <br />
          Designed to be Remembered.
        </h2>

        <div className="gallery-line" />

      </div>

      <div className="gallery-wrapper">

        <div className="gallery-row scroll-left">

          {firstRow.map((item, index) => (

            <GalleryCard
    key={`row1-${index}`}
    item={item}
    navigate={navigate}
/>

          ))}

        </div>

      </div>

      <div className="gallery-wrapper">

        <div className="gallery-row scroll-right">

          {secondLoop.map((item, index) => (

           <GalleryCard
    key={`row2-${index}`}
    item={item}
    navigate={navigate}
/>

          ))}

        </div>

      </div>

    </section>
  );
}

function GalleryCard({ item, navigate }) {

  return (

    <motion.div

      className="gallery-card"

      whileHover={{
        scale: 1.05,
        rotateX: 4,
        rotateY: -4,
        y: -10
      }}

      transition={{
        duration: .35
      }}

    >

      <div className="gallery-image">

        <img
          src={item.image}
          alt={item.title}
        />

      </div>

      <div className="gallery-info">

        <span>

          {item.category}

        </span>

        <h3>

          {item.title}

        </h3>

        <button
  onClick={() => navigate(item.link)}
>
  Explore →
</button>

      </div>

      <div className="shine"/>

    </motion.div>

  )

}