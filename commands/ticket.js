const { Client, EmbedBuilder, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, ButtonStyle } = require("discord.js");
const db = require("croxydb");
const { createTranscript } = require('discord-html-transcripts');

module.exports = {
    name: "ticket-sistemi",
    description: "Ticket sistemi!",
    type: 1,
    options: [
        {
            name: "ticket-log",
            description: "Ticket loglarının düşeceği kanal!",
            type: 7,
            required: true,
        },
        {
            name: "ticket-kanal",
            description: "Ticket Metin kanalı!",
            type: 7,
            required: true,
        },
        {
            name: "ticket-kategori",
            description: "Ticketların oluşturulacağı kategori!",
            type: 7,
            required: true,
            channel_types: [4]
        },
        {
            name: "ticket-rol",
            description: "Ticketlarla ilgilenecek yetkili rol!",
            type: 8,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        const member = interaction.member;
        if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: "❌ | Yetkin Yok!", ephemeral: true });
        }
        const ticketLogKanal = interaction.options.getChannel('ticket-log');
        const ticketKanal = interaction.options.getChannel('ticket-kanal');
        const ticketKategori = interaction.options.getChannel('ticket-kategori');
        const ticketYetkiliRol = interaction.options.getRole('ticket-rol');

        db.set(`ticketLogKanal_${interaction.guild.id}`, ticketLogKanal.id);
        db.set(`ticketKategori_${interaction.guild.id}`, ticketKategori.id);
        db.set(`ticketYetkiliRol_${interaction.guild.id}`, ticketYetkiliRol.id);

        const info = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("**SetScript Ticket Sistemi**")
            .setThumbnail('https://avatars.githubusercontent.com/u/195494565?s=200&v=4')
            .setDescription("Ticket Oluşturarak iletişime geçebilirsiniz.")
            .addFields(
                { name: "❗️❗️❗️Dikkat", value: `*▪ Ticketlarınızı açarken sebepsiz yere açmayınız.*\n*▪ Herhangi Bir Durumda İletişim:* <@&${ticketYetkiliRol.id}>` }
            )
            .setImage('https://private-user-images.githubusercontent.com/106106051/405172310-b07e42cf-607e-4245-8f1f-5e8528ae5829.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mzc1NTE5NzMsIm5iZiI6MTczNzU1MTY3MywicGF0aCI6Ii8xMDYxMDYwNTEvNDA1MTcyMzEwLWIwN2U0MmNmLTYwN2UtNDI0NS04ZjFmLTVlODUyOGFlNTgyOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMTIyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDEyMlQxMzE0MzNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hNzBkZWNmYmJiMWM5ZTdkYjNmYWQwNzg3ZTdmYTI1Y2YxOWM1ODBmMDFjMzdlNmJjMmI0ODNkZmUzOTc4NTY2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.rO8u7LYTwWmOC04FbEwvb55hHlIiMio1_nl5L4NdWAs')
            .setFooter({ text: "Dikkat: Ticketlarda yetkililere saygılı olalım." });

        const selectMenu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('ticket_select')
                    .setPlaceholder('Bir seçenek belirleyin')
                    .addOptions([
                        { 
                            label: 'Destek', 
                            value: 'destek', 
                            emoji: '🔧', 
                            description: 'Yardıma mı ihtiyacınız var?' 
                        },
                        { 
                            label: 'Öneri', 
                            value: 'oneri', 
                            emoji: '💡', 
                            description: 'Fikirlerinizi bizimle paylaşın.' 
                        },
                        { 
                            label: 'Şikayet', 
                            value: 'sikayet', 
                            emoji: '⚠️', 
                            description: 'Bir sorun mu yaşadınız? Bildirin.' 
                        },
                        { 
                            label: 'İşbirliği', 
                            value: 'isbirligi', 
                            emoji: '🤝', 
                            description: 'Bizimle işbirliği yapmayı mı düşünüyorsunuz?' 
                        },
                    ])
            );

        await ticketKanal.send({ embeds: [info], components: [selectMenu] });
        return interaction.reply({ content: 'Ticket sistemi başarıyla kuruldu.', ephemeral: true });
    }
};

client.on('interactionCreate', async interaction => {
    if (interaction.isStringSelectMenu()) {
        const guild = interaction.guild;
        const member = interaction.member;
        const ticketKategori = db.get(`ticketKategori_${guild.id}`);
        const ticketYetkiliRol = db.get(`ticketYetkiliRol_${guild.id}`);

        if (!ticketKategori || !ticketYetkiliRol) {
            return interaction.reply({ content: 'Ticket kategorisi veya yetkili rolü ayarlanmamış.', ephemeral: true });
        }

        const kanalAdi = `${interaction.values[0]}-${member.user.username}`;
        const ticketChannel = await guild.channels.create({
            name: kanalAdi,
            type: 0, 
            parent: ticketKategori,
            permissionOverwrites: [
                {
                    id: guild.roles.everyone.id,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: member.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                },
                {
                    id: ticketYetkiliRol,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                }
            ]
        });

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("SetScript Ticket")
        .setDescription("Merhaba, ekibimiz en kısa süre içerisinde ilgilenecektir.")
        .setThumbnail('https://avatars.githubusercontent.com/u/195494565?s=200&v=4')
        .addFields(
            { name: "Önemli!", value: "• Discord talepleri içerisinde herhangi bir şekilde özel bilgilerinizi iletmeyiniz. Örnek olarak Sunucu ip adresiniz, kullanıcı adınız, şifreniz vs.\n• Yetkililere kesinlikle etiket atmak YASAKTIR.\n• Kesinlikle DM üzerinden destek BULUNMAMAKTADIR." }
        )
        .setImage('https://private-user-images.githubusercontent.com/106106051/405172310-b07e42cf-607e-4245-8f1f-5e8528ae5829.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mzc1NTE5NzMsIm5iZiI6MTczNzU1MTY3MywicGF0aCI6Ii8xMDYxMDYwNTEvNDA1MTcyMzEwLWIwN2U0MmNmLTYwN2UtNDI0NS04ZjFmLTVlODUyOGFlNTgyOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMTIyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDEyMlQxMzE0MzNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hNzBkZWNmYmJiMWM5ZTdkYjNmYWQwNzg3ZTdmYTI1Y2YxOWM1ODBmMDFjMzdlNmJjMmI0ODNkZmUzOTc4NTY2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.rO8u7LYTwWmOC04FbEwvb55hHlIiMio1_nl5L4NdWAs')
        .setFooter({ text: "Dikkat: Ticketlarda yetkililere saygılı olalım." });

        const etiketleme = `<@${member.id}> | <@&${ticketYetkiliRol}>`;

        const ticket = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Kapat")
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId("ticket_close"),
                new ButtonBuilder()
                    .setLabel("Bileti Nedeniyle Kapat")
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId("ticket_reason_close")
            );

        await ticketChannel.send({ content: etiketleme, embeds: [embed], components: [ticket] });
        return interaction.reply({ content: 'Ticket kanalınız oluşturuldu. Lütfen gerekli bilgileri sağlayın.', ephemeral: true });
        } else if (interaction.customId === 'ticket_close') {
            const kanal = interaction.channel;
            const ticketLogKanalId = db.get(`ticketLogKanal_${interaction.guild.id}`);
            const ticketLogKanal = interaction.guild.channels.cache.get(ticketLogKanalId);
            
            if (!ticketLogKanal) {
                return interaction.reply({ content: 'Ticket log kanalı bulunamadı.', ephemeral: true });
            }
        
            const transcript = await createTranscript(kanal, { returnBuffer: false });
            await ticketLogKanal.send({ content: `Ticket kapandı: ${kanal.name}`, files: [transcript] });
        
            await kanal.delete(); 
        } else if (interaction.customId === 'ticket_reason_close') {
            const kanal = interaction.channel;

            const modal = new ModalBuilder()
                .setCustomId('ticketReasonModal')
                .setTitle('Ticket Kapatma Nedeni')
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('ticketReasonInput')
                            .setLabel('Kapatma Nedeni')
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                    )
                );

            await interaction.showModal(modal);
        } else if (interaction.type === InteractionType.ModalSubmit) {
        if (interaction.customId === 'ticketReasonModal') {
            const reason = interaction.fields.getTextInputValue('ticketReasonInput');
            const kanal = interaction.channel;
            const ticketLogKanalId = db.get(`ticketLogKanal_${interaction.guild.id}`);
            const ticketLogKanal = interaction.guild.channels.cache.get(ticketLogKanalId);
            
            await interaction.deferUpdate();
            
            const transcript = await createTranscript(kanal, { returnBuffer: false });
            await ticketLogKanal.send({ content: `Ticket kapandı: ${kanal.name} (Nedeni: ${reason})`, files: [transcript] });
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            await kanal.delete();
        }
    }
});