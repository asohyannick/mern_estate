import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  console.log(sidebarData);
  const [loading, setLaoding] = useState(false);
  const [listings, setListings] = useState([]);
  const [errorListing, setErrorListing] = useState(false);
  console.log(listings);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "dsc",
      });
    }
    const fetchListings = async () => {
      try {
        setLaoding(true);
        setErrorListing(false);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/getListings/${searchQuery}`);
        const data = await res.json();
        if (data.success === false) {
          setErrorListing(data.message);
          setListings(false);
          return;
        } else {
          setListings(data);
          setLaoding(false);
        }
      } catch (error) {
        setLaoding(false);
        setErrorListing(true);
      }
    };
    fetchListings();
  }, [location.search]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({ ...setSidebarData, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "dsc";
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search/${searchQuery}`);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2  md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              value={sidebarData.searchTerm}
              placeholder="Search..."
              onChange={handleChange}
              className="p-3 w-full rounded-lg"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold whitespace-nowrap">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
                className="w-5"
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
                id="rent"
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={sidebarData.type === "sale"}
                id="sale"
                className="w-5"
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={sidebarData.offer}
                id="offer"
                className="w-5"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="whitespace-nowrap font-semibold">
              Amenities:
            </label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={sidebarData.parking}
                id="parking"
                className="w-5"
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2 ju">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={sidebarData.furnished}
                id="furnished"
                className="w-5"
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="">
            <label className="font-semibold whitespace-nowrap mr-2">
              Sort:
            </label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 w-full rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b text-slate-700 mt-5">
          Listing Result
        </h1>
      </div>
    </div>
  );
}
