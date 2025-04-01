import './styles/main.css'
import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import turkeyTopoJson from './iller/turkey.json'; // Türkiye TopoJSON dosyası
import adanaTopoJson from './ilceler/adana.json'; // Adana TopoJSON dosyası

function App() {
    const [hoveredProvince, setHoveredProvince] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [districtData, setDistrictData] = useState(null);
    const [hoveredDistrict, setHoveredDistrict] = useState(null);
  
    // Türkçe karakterleri doğru şekilde küçük harfe çeviren fonksiyon
    const turkishToLower = (str) => {
        const letters = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
        return str.replace(/[İIŞĞÜÖÇ]/g, letter => letters[letter]).toLowerCase();
    };
  
    // İl merkezleri ve isimleri için veri
    const provinceData = [
      { id: 1, name: "Adana", coordinates: [35.3213, 37.0] },
      { id: 2, name: "Adıyaman", coordinates: [38.2799, 37.7648] },
      { id: 3, name: "Afyon", coordinates: [30.5389, 38.7507] },
      { id: 4, name: "Ağrı", coordinates: [43.0503, 39.7191] },
      { id: 5, name: "Aksaray", coordinates: [34.0297, 38.3687] },
      { id: 6, name: "Amasya", coordinates: [35.8373, 40.6499] },
      { id: 7, name: "Ankara", coordinates: [32.8597, 39.9334] },
      { id: 8, name: "Antalya", coordinates: [30.7133, 36.8841] },
      { id: 9, name: "Ardahan", coordinates: [42.7023, 41.1105] },
      { id: 10, name: "Artvin", coordinates: [41.8183, 41.1828] },
      { id: 11, name: "Aydın", coordinates: [27.8456, 37.8560] },
      { id: 12, name: "Balıkesir", coordinates: [27.8903, 39.6484] },
      { id: 13, name: "Bartın", coordinates: [32.3375, 41.6344] },
      { id: 14, name: "Batman", coordinates: [41.1200, 37.8812] },
      { id: 15, name: "Bayburt", coordinates: [40.2239, 40.2552] },
      { id: 16, name: "Bilecik", coordinates: [29.9791, 40.1506] },
      { id: 17, name: "Bingöl", coordinates: [40.4983, 38.8855] },
      { id: 18, name: "Bitlis", coordinates: [42.1093, 38.4006] },
      { id: 19, name: "Bolu", coordinates: [31.6082, 40.7392] },
      { id: 20, name: "Burdur", coordinates: [30.2869, 37.7205] },
      { id: 21, name: "Bursa", coordinates: [29.0610, 40.1885] },
      { id: 22, name: "Denizli", coordinates: [29.0963, 37.7765] },
      { id: 23, name: "Diyarbakır", coordinates: [40.2346, 37.9144] },
      { id: 24, name: "Düzce", coordinates: [31.1565, 40.8438] },
      { id: 25, name: "Edirne", coordinates: [26.5557, 41.6771] },
      { id: 26, name: "Elazığ", coordinates: [39.2208, 38.6810] },
      { id: 27, name: "Erzincan", coordinates: [39.4900, 39.7500] },
      { id: 28, name: "Erzurum", coordinates: [41.2658, 39.9000] },
      { id: 29, name: "Eskişehir", coordinates: [30.5206, 39.7767] },
      { id: 30, name: "Gaziantep", coordinates: [37.3781, 37.0662] },
      { id: 31, name: "Giresun", coordinates: [38.3927, 40.9128] },
      { id: 32, name: "Gümüşhane", coordinates: [39.4542, 40.4386] },
      { id: 33, name: "Hakkari", coordinates: [43.7400, 37.5742] },
      { id: 34, name: "Hatay", coordinates: [36.3528, 36.2023] },
      { id: 35, name: "İstanbul", coordinates: [29.0100, 41.1053] },
      { id: 36, name: "İzmir", coordinates: [27.1428, 38.4192] },
      { id: 37, name: "Isparta", coordinates: [30.5520, 37.7648] },
      { id: 38, name: "Kahramanmaraş", coordinates: [36.9228, 37.5858] },
      { id: 39, name: "Karabük", coordinates: [32.6277, 41.2061] },
      { id: 40, name: "Karaman", coordinates: [33.2154, 37.1759] },
      { id: 41, name: "Kars", coordinates: [43.0974, 40.6013] },
      { id: 42, name: "Kastamonu", coordinates: [33.7760, 41.3887] },
      { id: 43, name: "Kayseri", coordinates: [35.4827, 38.7205] },
      { id: 44, name: "Kilis", coordinates: [37.1147, 36.7184] },
      { id: 45, name: "Kocaeli", coordinates: [29.9167, 40.8533] },
      { id: 46, name: "Konya", coordinates: [32.4847, 37.8714] },
      { id: 47, name: "Kütahya", coordinates: [29.9833, 39.4167] },
      { id: 48, name: "Kırklareli", coordinates: [27.2267, 41.7333] },
      { id: 49, name: "Kırıkkale", coordinates: [33.5067, 39.8467] },
      { id: 50, name: "Kırşehir", coordinates: [34.1667, 39.1500] },
      { id: 51, name: "Malatya", coordinates: [38.3167, 38.3552] },
      { id: 52, name: "Manisa", coordinates: [27.4306, 38.6191] },
      { id: 53, name: "Mardin", coordinates: [40.7433, 37.3126] },
      { id: 54, name: "Mersin", coordinates: [34.6415, 36.8089] },
      { id: 55, name: "Muğla", coordinates: [28.3665, 37.2153] },
      { id: 56, name: "Muş", coordinates: [41.4910, 38.7432] },
      { id: 57, name: "Nevşehir", coordinates: [34.7133, 38.6244] },
      { id: 58, name: "Niğde", coordinates: [34.6761, 37.9697] },
      { id: 59, name: "Ordu", coordinates: [37.8797, 40.9862] },
      { id: 60, name: "Osmaniye", coordinates: [36.2485, 37.0746] },
      { id: 61, name: "Rize", coordinates: [40.5219, 41.0201] },
      { id: 62, name: "Sakarya", coordinates: [30.4034, 40.7569] },
      { id: 63, name: "Samsun", coordinates: [36.3361, 41.2867] },
      { id: 64, name: "Siirt", coordinates: [41.9417, 37.9333] },
      { id: 65, name: "Sinop", coordinates: [35.1550, 42.0231] },
      { id: 66, name: "Sivas", coordinates: [37.0150, 39.7477] },
      { id: 67, name: "Tekirdağ", coordinates: [27.5111, 40.9781] },
      { id: 68, name: "Tokat", coordinates: [36.5524, 40.3167] },
      { id: 69, name: "Trabzon", coordinates: [39.7168, 41.0027] },
      { id: 70, name: "Tunceli", coordinates: [39.5481, 39.1062] },
      { id: 71, name: "Uşak", coordinates: [29.4058, 38.6823] },
      { id: 72, name: "Van", coordinates: [43.3833, 38.4891] },
      { id: 73, name: "Yalova", coordinates: [29.2769, 40.6500] },
      { id: 74, name: "Yozgat", coordinates: [34.8089, 39.8181] },
      { id: 75, name: "Zonguldak", coordinates: [31.7937, 41.4564] },
      { id: 76, name: "Çanakkale", coordinates: [26.4086, 40.1553] },
      { id: 77, name: "Çankırı", coordinates: [33.6168, 40.6013] },
      { id: 78, name: "Çorum", coordinates: [34.9537, 40.5489] },
      { id: 79, name: "İstanbul", coordinates: [29.0100, 41.1053] },
      { id: 80, name: "İzmir", coordinates: [27.1428, 38.4192] },
      { id: 81, name: "Şanlıurfa", coordinates: [38.7955, 37.1674] },
      { id: 82, name: "Şırnak", coordinates: [42.4542, 37.5164] }
    ];

    useEffect(() => {
        if (selectedCity) {
            try {
                // İlçe verisini dinamik olarak yükle
                import(`./ilceler/${turkishToLower(selectedCity)}.json`)
                    .then(data => {
                        setDistrictData(data.default);
                    })
                    .catch(err => {
                        console.log("İlçe verisi bulunamadı:", selectedCity);
                        setDistrictData(null); 
                    });
            } catch (err) {
                console.log("İlçe verisi yüklenemedi:", err);
                setDistrictData(null);
            }
        }
    }, [selectedCity]);

    const onSelectCity = (cityName) => {
        setSelectedCity(cityName);
        setShowPopup(true);
        setDistrictData(null); // Yeni şehir seçildiğinde ilçe verisini sıfırla
        console.log("Selected city:", cityName);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedCity(null);
        setDistrictData(null);
        setHoveredDistrict(null);
    };

  return (
    <>
      <div className="map-container">
        {showPopup && selectedCity && (
          <div className="popup">
            <h3>{selectedCity}</h3>
            {districtData ? (
              <div className="district-map">
                <div className='hoveredDistrict'>
                  {hoveredDistrict && (
                    <>
                      {hoveredDistrict}
                    </>
                  )}
                </div>
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    center: provinceData.find(p => p.name === selectedCity)?.coordinates || [35, 39],
                    scale: 8000
                  }}
                  className="map"
                >
                  <Geographies geography={districtData}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const isHovered = hoveredDistrict === geo.properties.name;
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={isHovered ? "#FF9800" : "#607D8B"}
                            stroke="#FFFFFF"
                            strokeWidth={0.5}
                            style={{
                              default: { outline: "none" },
                              hover: { fill: "#FF9800", outline: "none" },
                              pressed: { fill: "#E64A19", outline: "none" },
                            }}
                            onMouseEnter={() => setHoveredDistrict(geo.properties.name)}
                            onMouseLeave={() => setHoveredDistrict(null)}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ComposableMap>
                
              </div>
            ) : (
              <div>Bu il için ilçe haritası bulunmamaktadır.</div>
            )}
            <button 
              onClick={closePopup}
              className="close-button"
            >
              Kapat
            </button>
          </div>
        )}
        <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [35, 39],
          scale: 2200
        }}
        className="map"
      >
        <Geographies geography={turkeyTopoJson}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHovered = hoveredProvince === geo.properties.name;
              const centroid = geoCentroid(geo);
              
              return (
                <React.Fragment key={geo.rsmKey}>
                  <Geography
                    geography={geo}
                    fill={selectedCity === geo.properties.name ? "#FF5722" : isHovered ? "#FF9800" : "#607D8B"}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#FF9800", outline: "none" },
                      pressed: { fill: "#E64A19", outline: "none" },
                    }}
                    onMouseEnter={() => {
                      setHoveredProvince(geo.properties.name);
                    }}
                    onMouseLeave={() => {
                      setHoveredProvince(null);
                    }}
                    onClick={() => {
                      onSelectCity(geo.properties.name);
                      console.log(geo.properties);
                      
                    }}
                  />
                  <Marker coordinates={centroid}>
                    <text
                      y="2"
                      fontSize={isHovered ? 7 : 6}
                      textAnchor="middle"
                      fill={isHovered ? "#1C2529" :  "#1C2529"}
                    >
                      {geo.properties.name}
                    </text>
                  </Marker>
                </React.Fragment>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
    </>
  )
}

export default App
