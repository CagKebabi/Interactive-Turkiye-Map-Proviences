# İnteraktif Türkiye Haritası

Bu proje, Türkiye'nin tüm il ve ilçelerini interaktif bir harita üzerinde görüntülemeyi sağlayan bir web uygulamasıdır. React ve modern web teknolojileri kullanılarak geliştirilmiştir.

## Özellikler

- Türkiye'nin tüm illerinin interaktif haritası
- İl sınırlarının detaylı görselleştirilmesi
- Hover efektleri ile kullanıcı dostu arayüz
- İl seçimi ve detaylı bilgi görüntüleme
- İlçe detayları ve sınırları
- Responsive tasarım

## Kullanılan Teknolojiler

- React + Vite
- React Simple Maps
- D3-geo
- TopoJSON/GeoJSON
- Modern CSS

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd Interactive-Turkiye-Map-Proviences
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda açın:
```
http://localhost:5173
```

## Proje Yapısı

```
src/
├── ilceler/          # İlçe sınır verileri (JSON)
├── iller/            # İl sınır verileri (JSON)
├── styles/           # CSS dosyaları
├── App.jsx          # Ana uygulama bileşeni
└── main.jsx         # Giriş noktası
```

## Veri Yapısı

- `iller/turkey.json`: Türkiye'nin il sınırlarını içeren GeoJSON verisi
- `ilceler/*.json`: Her il için ilçe sınırlarını içeren TopoJSON verileri

## Katkıda Bulunma

1. Bu projeyi fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.

## İletişim

[İletişim bilgileriniz]

---

Made with ❤️ in Türkiye
