const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "ticket-bilgilendirme",
  description: "Ticket sisteminin nasıl kullanılacağını açıklar!",
  type: 1,
  options: [
    {
      name: 'kanal',
      type: 7, 
      description: 'Ticket oluşturma kanalı',
      required: true,
    },
    {
      name: 'rol',
      type: 8, 
      description: 'Destek ekibi rolü',
      required: true,
    }
  ],
  run: async (client, interaction) => {
    const member = interaction.member;
    if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: "❌ | Yetkin Yok!", ephemeral: true });
    }
    
    const kanal = interaction.options.getChannel('kanal');
    const rol = interaction.options.getRole('rol');

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("**Ticket Sistemi Bilgilendirme**")
      .setThumbnail('https://avatars.githubusercontent.com/u/195494565?s=200&v=4')
      .setDescription("Ticket sistemiyle nasıl iletişim kuracağınızı öğrenin.")
      .addFields(
        { name: "❗️❗️❗️Dikkat", value: `*▪ Ticketlarınızı açarken sebepsiz yere açmayınız.*\n*▪ Herhangi Bir Durumda İletişim:* <@&${rol.id}>` },
        { name: "Ticket Nasıl Açılır?", value: `1. <#${kanal.id}> kanalındaki ticket oluşturma butonuna tıklayın.\n2. Açılan kanalda talebinizi detaylı bir şekilde yazın.\n3. Yetkili ekibimiz en kısa sürede sizinle iletişime geçecektir.` },
        { name: "Ticket Kuralları", value: `*▪ Gereksiz yere ticket açmayınız.\n▪ Yetkililere saygılı olunuz.\n▪ Aynı konuda birden fazla ticket açmayınız.\n▪ Sorununuzu net bir şekilde ifade ediniz.\n▪ Ticket açtıktan sonra sabırlı olun, yetkililer size en kısa sürede yanıt verecektir.\n▪ Ticketlarınızda kişisel bilgilerinizi paylaşmamaya özen gösteriniz.\n▪ Ticketları kapatmadan önce yetkililerden onay alınız.*` }
      )
      .setImage('https://private-user-images.githubusercontent.com/106106051/405172310-b07e42cf-607e-4245-8f1f-5e8528ae5829.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mzc1NTE5NzMsIm5iZiI6MTczNzU1MTY3MywicGF0aCI6Ii8xMDYxMDYwNTEvNDA1MTcyMzEwLWIwN2U0MmNmLTYwN2UtNDI0NS04ZjFmLTVlODUyOGFlNTgyOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMTIyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDEyMlQxMzE0MzNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hNzBkZWNmYmJiMWM5ZTdkYjNmYWQwNzg3ZTdmYTI1Y2YxOWM1ODBmMDFjMzdlNmJjMmI0ODNkZmUzOTc4NTY2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.rO8u7LYTwWmOC04FbEwvb55hHlIiMio1_nl5L4NdWAs')
      .setFooter({ text: "Dikkat: Ticketlarda yetkililere saygılı olalım." });

    await interaction.reply({ embeds: [embed] });
  }
};
