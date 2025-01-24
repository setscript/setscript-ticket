Tabii ki, Discord Ticket botunuz için README belgesini hazırlıyorum. İşte düzenlenmiş hali:

---

# Discord Ticket Botu

![Ticket Bot](https://socialify.git.ci/setscript/setscript-ticket/image?description=1&font=Inter&forks=1&language=1&name=1&owner=1&pattern=Floating+Cogs&stargazers=1&theme=Dark)

Discord Ticket Botu, sunucularınızdaki kullanıcıların destek taleplerini yönetmek için tasarlanmış modern bir çözümdür. Kullanıcı dostu yapısıyla hızlı ve etkili bir destek sistemi sunar.

## Özellikler

- Ticket oluşturma ve yönetimi
- Detaylı ticket bilgileri
- Kullanıcı dostu arayüz
- Özelleştirilebilir ayarlar
- Gelişmiş etkinlik yönetimi

---

## Teknoloji Altyapısı

- **Backend**: Node.js
- **Database**: CroxyDB
- **Discord.js**: Etkileşimli bot komutları için
- **JavaScript**: Kodlama dili

---

## Başlangıç

### Gereksinimler

- Node.js (En son LTS sürümü)
- npm (Node.js ile birlikte gelir)
- Discord bot token

---

### Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/setscript/setscript-ticket.git
cd setscript-ticket
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Gerekli ayarları yapılandırın:
`config.json` dosyasını düzenleyerek Discord bot tokeninizi ve diğer ayarları girin.

4. Botu başlatın:
```bash
node start.bat
```

---

## Proje Yapısı

```
setscript-ticket/
├── commands/                 # Komut dosyaları
│   ├── ticket.js             # Ticket oluşturma komutu
│   └── ticketbilgi.js        # Ticket bilgilerini görüntüleme komutu
├── croxydb/                  # Veritabanı dosyaları
│   └── croxydb.json          # JSON tabanlı veritabanı
├── events/                   # Etkinlik dosyaları
│   ├── interactionCreate.js  # Etkileşim olayları
│   └── ready.js              # Botun başlatılma olayı
├── config.json               # Bot yapılandırma dosyası
├── index.js                  # Ana bot dosyası
├── package.json              # Proje bağımlılıkları
├── package-lock.json         # Bağımlılık kilit dosyası
├── README.md                 # Proje açıklaması
└── start.bat                 # Windows için hızlı başlangıç dosyası
```

---

## Önemli Bilgiler

> **Not:**  
> - `config.json` dosyasını dikkatlice doldurun. Yanlış bilgiler botun çalışmamasına neden olabilir.  
> - Bot, ticket verilerini ve kullanıcı bilgilerini `croxydb` kullanarak yönetir.  
> - Komutların doğru çalışması için yetkili rol ayarlarını yapmayı unutmayın.

---

## Katkıda Bulunma

Projenin geliştirilmesine katkı sağlamak isterseniz, Pull Request göndererek destek olabilirsiniz.

---

## Lisans

Bu proje MIT Lisansı ile lisanslanmıştır - detaylar için `LICENSE` dosyasına göz atabilirsiniz.

---

<p align="center">
  ❤️ Setscript@oktayyavuz tarafından geliştirildi
</p>
