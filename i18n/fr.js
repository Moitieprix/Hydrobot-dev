'use strict'

const emote = require('../utils/emotes.js')

module.exports = class {
  constructor () {
    this.language = {

      // Global
      INFO_PREFIX: prefix => `${emote.others.help} • Salut ! Mon préfixe sur ce serveur est \`${prefix}\``,

      UTILS: {
        ERROR: e => `${emote.others.no} • Une erreur est survenue : \`${e}\`, Merci de réesayer plus tard !`,
        API_ERROR: e => `${emote.others.no} • Une erreur est survenue à la génération de l'image : \`${e}\``,
        DATABASE_ERROR: e => `${emote.others.no} • Une erreur est survenu sur la base de donnée : \`${e}\`, Merci de réesayer plus tard !`,
        USER_DEFAUT: `${emote.others.no} • Je ne trouve pas cet utilisateur !`,
        CHANNEL_DEFAUT: `${emote.others.no} • Je ne trouve pas ce salon !`,
        ROLE_DEFAUT: `${emote.others.no} • Je ne trouve pas ce rôle !`,

        HYDROBOT_CATEGORY: `${emote.categories.hydrobot} • Hydrobot`,
        BOTSTAFF_CATEGORY: `${emote.categories.tools} • Administration Hydrobot`,
        GUILDADMIN_CATEGORY: `${emote.categories.settings} • Administration serveur`,
        OTHERS_CATEGORY: `${emote.categories.more} • Autres`,
        INFORMATION_CATEGORY: `${emote.categories.clipboard} • Informations`,
        FUN_CATEGORY: `${emote.categories.controller} • Divertissement`,
        IMAGE_CATEGORY: `${emote.categories.image} • Images`,
        NSFW_CATEGORY: `${emote.categories.nsfw} • NSFW`,

        BADWORDS_WARN: `${emote.others.no} • Ce mot n'est pas autorisé ici !`,
        ANTILINK_WARN: `${emote.others.no} • Les liens ne sont pas autorisés ici !`,
        ANTICAPS_WARN: `${emote.others.no} • Le capslock n'est pas autorisé ici !`,

        MONTHS: {
          Jan: 'Janvier',
          Feb: 'Février',
          Mar: 'Mars',
          Apr: 'Avril',
          May: 'Mai',
          Jun: 'Juin',
          Jul: 'Juillet',
          Aug: 'Août',
          Sep: 'Septembre',
          Oct: 'Octobre',
          Nov: 'Novembre',
          Dec: 'Décembre',
        },

        REGION: {
          brazil: 'Brésil :flag_br:',
          europe: 'Europe :flag_eu:',
          singapore: 'Singapour :flag_sg:',
          'us-central': 'Centre États-Unis :flag_us:',
          sydney: 'Sydney :flag_au:',
          'us-east': 'Est États-Unis :flag_us:',
          'us-south': 'Sud États-Unis :flag_us:',
          'us-west': 'Ouest États-Unis :flag_us:',
          'vip-us-east': 'VIP Est États-Unis :flag_us:',
          hongkong: 'Hong Kong :flag_hk:',
          russia: 'Russie :flag_ru:',
          southafrica: 'Afrique du Sud :flag_za:',
          japan: 'Japon :flag_jp:'
        },

        STATUS: {
          online: `${emote.statusDiscord.online} • En ligne`,
          idle: `${emote.statusDiscord.idle} • Inactif`,
          dnd: `${emote.statusDiscord.dnd} • Ne pas déranger`,
          offline: `${emote.statusDiscord.offline} • Déconnecté / invisible`
        },

        BOOLEAN: {
          true: 'Oui',
          false: 'Non'
        },

        CONTENT_LEVEL: {
          'DISABLED': 'Aucun',
          'MEMBERS_WITHOUT_ROLES': 'Analyse les messages des personnes sans rôle',
          'ALL_MEMBERS': 'Analyse tout les messages'
        },

        VERIFICATION_LEVEL: {
          'NONE': 'Aucun',
          'LOW': 'Faible : Email vérifié',
          'MEDIUM': 'Moyen : Inscrit sur Discord depuis 5 min',
          'HIGH': 'Élevé : Doit être sur le serveur depuis 10 min',
          'VERY_HIGH': 'Extreme : Double authentification requise !'

        }
      },

      LOGS: {
        MSG_DELETED: [
          ':wastebasket: • Message supprimé',
          'Auteur du message :',
          'Message supprimé dans :',
          'Contenu du message :'
        ],

        MSG_UPDATED: [
          ':repeat: • Message modifié',
          'Auteur du message :',
          'Message modifié dans :',
          'Message avant :',
          'Message après :',
          'Lien du message',
          ':pushpin: • Message épinglé',
          ':pushpin: • Message désépinglé',
          'Message épinglé dans :',
          'Message désépinglé dans :'
        ],

        MSG_DELETE_BULK: [
          ':wastebasket: • Messages supprimés (bulk)',
          'Nombre de messages :',
          'Supprimés dans :'
        ],

        GUILD_UPDATED: [
          ':repeat: • Serveur mis à jour',
          'Changement de nom :',
          'Ancien nom :',
          'Nouveau nom :',
          'Changement de région :',
          'Ancienne région :',
          'Nouvelle région :',
          'Changement d\'icône :',
          'Ancienne icône',
          'Nouvelle icône',
          'Aucune icône',
          'Ajout d\'un boost :',
          'Retrait d\'un boost :',
          'Nombre actuel :',
          'Niveau supérieur :',
          'Niveau inférieur :',
          'Tier actuel :',
          'Changement du salon AFK :',
          'Ancien salon :',
          'Nouveau salon :',
          'Aucun salon',
          'Changement de la bannière :',
          'Ancienne bannière :',
          'Nouvelle bannière :',
          'Aucune bannière',
          'Changement de l\'URL personalisée :',
          'Ancienne URL personalisée :',
          'Nouvelle URL personalisée :',
          'Aucune URL',
          'Changement du filtre de contenu explicite :',
          'Ancien filtre :',
          'Nouveau filtre :',
          'Changement du niveau de vérification :',
          'Ancien niveau :',
          'Nouveau niveau :'
        ],

        GUILD_MEMBER_UPDATED: [
          ':repeat: • Membre du serveur mis à jour',
          'Changement de surnom :',
          'Membre :',
          'Ancien surnom :',
          'Nouveau surnom :',
          'Aucun surnom',
          'Ajout du rôle :',
          'Retrait du rôle :'
        ],

        USER_UPDATED: [
          ':repeat: • Utilisateur mis à jour',
          'Changement de pseudo :',
          'Ancien pseudo :',
          'Nouveau pseudo :',
          'Changement de discriminant :',
          'Ancien discriminant :',
          'Nouveau discriminant :',
          'Changement de photo de profil :',
          'Ancienne photo',
          'Nouvelle photo',
          'Utilisateur :'
        ],

        EMOJI_CREATED: [
          ':inbox_tray: • Emoji ajouté',
          'Nom :',
          'ID :'
        ],

      },

      // Paramètres commandes
      COMMANDE_DISABLED: `${emote.others.no} • Cette commande est désactivée, elle sera réactivé prochainement !`,
      BOT_PERMISSION: permissions => `${emote.others.no} • Je n'ai pas les permissions nécessaires pour effectuer cette commande ! ${permissions}`,
      USER_PERMISSION: permissions => `${emote.others.no} • Tu n'as pas les permissions nécessaires pour effectuer cette commande ! ${permissions}`,
      OWNER: `${emote.others.no} • Cette commande ne peut-être effectuée que par les administrateurs du bot`,
      COOLDOWN: temps => `${emote.others.cooldown} • Merci d'attendre \`${temps}\` avant de réeffectuer cette commande`,
      NSFW: `${emote.others.no} • Cette commande ne peut-être effectuée que dans un salon NSFW`,

      // ADMINISTRATION //

      // Utils
      ADDROLE: role => `${emote.others.yes} • Le rôle <@&${role}> a bien été ajouté aux rôles ignorés`,
      REMOVEROLE: role => `${emote.others.yes} • Le rôle <@&${role}> a bien été retiré des rôles ignorés`,
      ADDCHANNEL: channel => `${emote.others.yes} • Le salon <#${channel}> a bien été ajouté aux salons ignorés`,
      REMOVECHANNEL: channel => `${emote.others.yes} • Le salon <#${channel}> a bien été retiré des salons ignorés`,
      ADDWORD: word => `${emote.others.yes} • Le mot \`${word}\` a bien été ajouté à la liste des mots bannis`,
      REMOVEWORD: word => `${emote.others.yes} • Le mot \`${word}\` a bien été retiré de la liste des mots bannis`,

      // anticaps.js
      ANTICAPS_USAGE: prefix => `• \`${prefix}anticaps\` - Affiche la liste des arguments disponibles pour l'anti-majuscules \n• \`${prefix}anticaps roles\` - Affiche la liste des rôles ignorés par l'anti-majuscules \n• \`${prefix}anticaps channels\` - Affiche la liste des salons ignorés par l'anti-majuscules \n• \`${prefix}anticaps addrole | removerole <@role | ID de rôle>\` - Ajoute ou supprime des rôles de la liste des rôles ignorés par l'anti-majuscules \n• \`${prefix}anticaps addchannel | removechannel <#salon | ID de salon>\` - Ajoute ou supprime des salons de la liste des rôles ignorés par l'anti-majuscules`,
      ANTICAPS_EXAMPLE: prefix => `\`${prefix}anticaps roles\` \n\`${prefix}anticaps channels\` \n\`${prefix}anticaps addrole @moderateur\` \n\`${prefix}anticaps removerole 669986011861745672\` \n\`${prefix}anticaps addchannel #shitpost\` \n\`${prefix}anticaps removechannel 669967519942967306\``,

      ANTICAPS: [
        `${emote.others.no} • Tu dois m'indiquer un rôle valide !`,
        `${emote.others.no} • Ce rôle est déjà immunisé !`,
        `${emote.others.no} • Ce rôle n'est pas immunisé !`,
        `${emote.others.no} • Tu dois m'indiquer un salon valide !`,
        `${emote.others.no} • Ce salon est déjà immunisé !`,
        `${emote.others.no} • Le salon doit être uniquement textuel !`,
        `${emote.others.no} • Ce salon n'est pas immunisé !`,
        '**Liste des rôles ignorés par l\'auti-majuscules**',
        'Aucun rôle !',
        '**Liste des salons ignorés par l\'anti-majuscules**',
        'Aucun salon !',
        '**Arguments disponibles pour l\'anti-majuscules**',
        '• `roles` : Afficher la liste des rôles ignorés par l\'anti-majuscules \n• `channels` : Afficher la liste des channels ignorés par l\'anti-majuscules \n• `addrole | removerole` : Ajouter ou supprimer des rôles de la liste des rôles ignorés par l\'anti-majuscules \n• `addchannel | removechannel` : Ajouter ou supprimer des salons de la liste des rôles ignorés par l\'anti-majuscules'
      ],

      // antilink.js
      ANTILINK_USAGE: prefix => `• \`${prefix}antilink\` - Affiche la liste des arguments disponibles pour l'anti-lien \n• \`${prefix}antilink roles\` - Affiche la liste des rôles ignorés par l'anti-lien \n• \`${prefix}antilink channels\` - Affiche la liste des salons ignorés par l'anti-lien \n• \`${prefix}antilink addrole | removerole <@role | ID de rôle>\` - Ajoute ou supprime des rôles de la liste des rôles ignorés par l'anti-lien \n• \`${prefix}antilink addchannel | removechannel <#salon | ID de salon>\` - Ajoute ou supprime des salons de la liste des rôles ignorés par l'anti-lien`,
      ANTILINK_EXAMPLE: prefix => `\`${prefix}antilink roles\` \n\`${prefix}antilink channels\` \n\`${prefix}antilink addrole @moderateur\` \n\`${prefix}antilink removerole 669986011861745672\` \n\`${prefix}antilink addchannel #shitpost\` \n\`${prefix}antilink removechannel 669967519942967306\``,

      ANTILINK: [
        `${emote.others.no} • Tu dois m'indiquer un rôle valide !`,
        `${emote.others.no} • Ce rôle est déjà immunisé !`,
        `${emote.others.no} • Ce rôle n'est pas immunisé !`,
        `${emote.others.no} • Tu dois m'indiquer un salon valide !`,
        `${emote.others.no} • Ce salon est déjà immunisé !`,
        `${emote.others.no} • Le salon doit être uniquement textuel !`,
        `${emote.others.no} • Ce salon n'est pas immunisé !`,
        '**Liste des rôles ignorés par l\'anti-lien**',
        'Aucun rôle !',
        '**Liste des salons ignorés par l\'anti-lien**',
        'Aucun salon !',
        '**Arguments disponibles pour l\'anti-lien**',
        '• `roles` : Afficher la liste des rôles ignorés par l\'anti-lien \n• `channels` : Afficher la liste des channels ignorés par l\'anti-lien \n• `addrole | removerole` : Ajouter ou supprimer des rôles de la liste des rôles ignorés par l\'anti-lien \n• `addchannel | removechannel` : Ajouter ou supprimer des salons de la liste des rôles ignorés par l\'anti-lien'
      ],

      // autorole.js
      AUTOROLE_USAGE: prefix => `• \`${prefix}autorole\` - Affiche la liste des arguments disponibles pour l'autorole \n• \`${prefix}autorole roles\` - Affiche la liste des rôles de l'autorole \n• \`${prefix}autorole addrole | removerole <@role | ID de rôle>\` - Ajoute ou supprime des rôles de la liste des rôles ajoutés à l'arrivé d'un membre sur le serveur \n${emote.others.caution} • Attention, pour que l'autorole fonctionne, le bot doit avoir un rôle plus élevé que le rôle donnée. Dans le cas contraire, le bot ne pourra pas donner le rôle à l'arrivée d'un membre.`,
      AUTOROLE_EXAMPLE: prefix => `\`${prefix}autorole addrole @membre\` \n\`${prefix}autorole removerole 669986011861745672\``,

      AUTOROLE: [
        `${emote.others.no} • Tu dois m'indiquer un rôle valide !`,
        `${emote.others.no} • Ce rôle est déjà dans la liste de l'autorole !`,
        `${emote.others.no} • Ce rôle n'est pas dans la liste de l'autorole !`,
        '**Liste des rôles de l\'autorole**',
        'Aucun rôle !',
        '**Arguments disponibles pour l\'autorole**',
        '• `roles` : Afficher la liste des rôles ajoutés à un membre lors de son arrivé \n• `addrole | removerole` : Ajouter ou supprimer des rôles de la liste des rôles ajoutés à un membre lors de son arrivé'
      ],

      AUTOROLE_ADDROLE: role => `${emote.others.yes} • Le rôle <@&${role}> a bien été ajouté à la liste de l'autorole`,
      AUTOROLE_REMOVEROLE: role => `${emote.others.yes} • Le rôle <@&${role}> a bien été retiré de la liste de l'autorole`,

      // badwords.js
      BADWORDS_USAGE: prefix => `• \`${prefix}badwords\` - Affiche la liste des arguments disponibles pour l'anti-badwords \n• \`${prefix}badwords roles\` - Affiche la liste des rôles ignorés par l'anti-badwords \n• \`${prefix}badwords channels\` - Affiche la liste des salons ignorés par l'anti-badwords \n• \`${prefix}badwords words\` - Affiche la liste des mots bannis \n• \`${prefix}badwords addrole | removerole <@role | ID de rôle>\` - Ajoute ou supprime des rôles de la liste des rôles ignorés par l'anti-badwords \n• \`${prefix}badwords addchannel | removechannel <#salon | ID de salon>\` - Ajoute ou supprime des salons de la liste des rôles ignorés par l'anti-badwords \n• \`${prefix}badwords addword | removeword <mot>\` - Ajoute ou supprime des mots bannis`,
      BADWORDS_EXAMPLE: prefix => `\`${prefix}badwords addrole @moderateur\` \n\`${prefix}badwords removerole 669986011861745672\` \n\`${prefix}badwords addchannel #shitpost\` \n\`${prefix}badwords removechannel 669967519942967306\` \n\`${prefix}badwords addword merde\` \n\`${prefix}badwords removeword merde\``,

      BADWORDS: [
        `${emote.others.no} • Tu dois m'indiquer un rôle valide !`,
        `${emote.others.no} • Ce rôle est déjà immunisé !`,
        `${emote.others.no} • Ce rôle n'est pas immunisé !`,
        `${emote.others.no} • Tu dois m'indiquer un salon valide !`,
        `${emote.others.no} • Ce salon est déjà immunisé !`,
        `${emote.others.no} • Le salon doit être uniquement textuel !`,
        `${emote.others.no} • Ce salon n'est pas immunisé !`,
        `${emote.others.no} • Tu dois m'indiquer un mot !`,
        '**Liste des mots bannis**',
        'Aucun mot !',
        '**Liste des rôles ignorés par l\'anti-lien**',
        'Aucun rôle !',
        '**Liste des salons ignorés par l\'anti-lien**',
        'Aucun salon !',
        '**Arguments disponibles pour l\'anti-badwords**',
        '• `roles` : Afficher la liste des rôles ignorés par l\'anti-badwords \n• `channels` : Afficher la liste des channels ignorés par l\'anti-badwords \n• `words` : Afficher la liste des mots bannis \n• `addrole | removerole` : Ajouter ou supprimer des rôles de la liste des rôles ignorés par l\'anti-badwords \n• `addchannel | removechannel` : Ajouter ou supprimer des salons de la liste des rôles ignorés par l\'anti-badwords \n• `addword | removeword` : Ajouter ou supprimer des mots bannis'
      ],

      // FUN //

      // HYDROBOT //

      // about.js
      ABOUT_USAGE: prefix => `• \`${prefix}botinfo\` - Affiche les informations générales d'Hydrobot`,
      ABOUT_EXAMPLE: prefix => `\`${prefix}botinfo\``,

      ABOUT: [
        ':busts_in_silhouette: • Développeur :',
        ':bulb: • Contributeurs :',
        ':tools: • Administrateurs :',
        ':bar_chart: • Global :',
        ':bar_chart: • Shard actuelle :',
        'utilisateurs',
        'serveurs',
        ':robot: • Version Hydrobot :',
      ],

      // help.js
      HELP_USAGE: prefix => `• \`${prefix}help\` - Affiche la liste complète des commandes disponibles \n• \`${prefix}help [commande | aliase]\` - Affiche les informations complémentaires de la commande mentionné`,
      HELP_EXAMPLE: prefix => `\`${prefix}help\` \n\`${prefix}help ping\` \n\`${prefix}help whois\``,
      HELP_NOT_FOUND: args => `${emote.others.no} • \`${args[0]}\` est introuvable !`,
      HELP_EMBED_DESCRIPTION: prefix => `• Préfixe : \`${prefix}\` \n• Utilise \`${prefix}help [commande | aliase]\` pour obtenir plus d'information sur une commande \n• Les arguments entre \`<>\` sont obligatoires et entre \`[]\` sont optionnels \n• Différentes commandes supplémentaires sont activables à l'aide de \`${prefix}plugin\``,

      HELP: [
        'Commande',
        'Utilisation :',
        'Exemple(s) :',
        'Aliase(s) :',
        'Aucun aliase',
        'Cooldown :',
        'seconde(s)',
        'Permission(s) :',
        'Aucune permission requise',
        'Commandes'
      ],

      // ping.js
      PING_USAGE: prefix => `• \`${prefix}ping\` - Affiche la latence d'Hydrobot ainsi que celle de l'API`,
      PING_EXAMPLE: prefix => `\`${prefix}ping\``,
      PING: [
        ':robot: • Latence Bot',
        ':satellite: • Latence API'
      ],

      // speedtest.js
      SPEEDTEST_USAGE: prefix => `• \`${prefix}speedtest\` - Affiche la vitesse de connexion ainsi que la latence d'Hydrobot`,
      SPEEDTEST_EXAMPLE: prefix => `\`${prefix}speedtest\``,
      SPEEDTEST: [
        `${emote.others.loading} • Chargement...`,
        ':signal_strength: • Latence serveur',
        ':robot: • Latence Bot',
        ':satellite: • Latence API',
        ':arrow_down: • Download',
        ':arrow_up: • Upload',
        'Bande passante :',
        'Bande passante non ajustée :',
      ],

      // Prefix
      PREFIX_DESCRIPTION: 'Change ou réinitialise le préfixe du serveur',
      PREFIX_USAGE: prefix => `${prefix}préfixe <prefix / reset>`,
      PREFIX_EXEMPLE: prefix => `${prefix}prefix ? \nh${prefix}prefix reset`,
      PREFIX_ARGS: `${emote.others.no} • Tu dois m'indiquer un préfixe !`,
      PREFIX_LENGTH: `${emote.others.no} • Le préfixe ne doit pas contenir plus de 3 caractères`,
      PREFIX_ASCII: `${emote.others.no} • Certains caractères ne sont pas autorisés (Les caractères autorisés sont : a-z, A-Z, !?;:*-+=$/@)`,
      PREFIX_CHANGE: `${emote.others.yes} • Changement de préfixe`,
      PREFIX_CHANGE_DESC: args => `Le préfixe a bien été changé pour \`${args[0]}\``,

      //Logs
      LOGS_DESCRIPTION: 'Commande de setup des logs',
      LOGS_USAGE: prefix => `${prefix}logs < list | log | setchannel >`,
      LOGS_EXEMPLE: prefix => `${prefix}logs list \n${prefix}logs messageDelete \nlogs setchannel 123456789876543210`,
      LOGS_ENABLE: plugin => `${emote.others.yes} • Le plugin \`${plugin}\` a été activé !`,
      LOGS_DISABLE: plugin => `${emote.others.yes} • Le plugin \`${plugin}\` a été désactivé !`,
      LOGS_ARGS: `${emote.others.no} • Argument invalide !`,
      LOGS_CHANNEL: channel => `${emote.others.yes} • <#${channel}> est désormais le salon d'envoi pour les logs !`,

      //Plugin
      PLUGIN_DESCRIPTION: 'Commande de setup des plugins',
      PLUGIN_USAGE: prefix => `${prefix} < list | plugin >`,
      PLUGIN_EXEMPLE: prefix => `${prefix} list \n${prefix} logs`,
      PLUGIN_ENABLE: plugin => `${emote.others.yes} • Le plugin \`${plugin}\` a été activé !`,
      PLUGIN_DISABLE: plugin => `${emote.others.yes} • Le plugin \`${plugin}\` a été désactivé !`,
      PLUGIN_ARGS: `${emote.others.no} • Argument invalide !`,

      // Avatar
      AVATAR_DESC: 'Affiche la photo de profil d\'un utilisateur',
      AVATAR_USAGE: prefix => `${prefix}avatar [ @mention / pseudo ]`,
      AVATAR_EXEMPLE: prefix => `${prefix}avatar \n${prefix}avatar @Moitié prix#4263 \n${prefix}avatar Moitié`,

      // Permissions
      PERMISSIONS_DESC: 'Donne les permissions de l\'utilisateur',
      PERMISSIONS_USAGE: prefix => `${prefix}permissions [@mention / pseudo]`,
      PERMISSIONS_EXEMPLE: prefix => `${prefix}permissions \n${prefix}permissions @Moitié prix#4263 \n${prefix}permissions Moitié`,

      // Emote
      EMOTE_TITLE: (guild, size) => `Emojis du serveur **${guild}** (${size})`,
      EMOTE_EMBED: [
        '• Nom :',
        '• Créateur :',
        '• Date de création :',
        '• Est t\'il animé ?',
        '• Lien :',
        'Clique ici !',
        'Oui',
        'Non',
        ':notepad_spiral: • Général',
        '• ID :'
      ],
      EMOTE_ERREUR: `${emote.others.no} • Cet emoji n'est pas reconnu !`,
      EMOTE_0: 'Aucun emote n\'est present sur ce serveur',

      EMOTE_DESC: 'Affiche les emotes du serveur ou les informations d\'un emote en particulier',
      EMOTE_USAGE: prefix => `${prefix}emojis [:emote:]`,
      EMOTE_EXEMPLE: prefix => `${prefix}emojis \n${prefix}emojis :kappa:`,

      // Serverinfo
      SERVERINFO_DESC: 'Donne les informations du serveur',
      SERVERINFO_USAGE: prefix => `${prefix}serverinfo`,

      SERVERINFO_EMBED: [
        '**Informations du serveur**',
        ':notepad_spiral: • Général',
        '• Nom :',
        '• ID :',
        '• Propriétaire :',
        '• Région :',
        '• Serveur créé le :',
        ':paperclip: • Divers',
        '• Dernier membre :',
        '• Niveau de vérification :',
        '• Filtre de contenu explicite :',
        '• Salon AFK :',
        '• Délai d\'AFK :',
        '**Aucun salon d\'AFK**',
        ':busts_in_silhouette: • Membres',
        'Humains',
        'Bots',
        ':gear: • Rôles',
        ':eyes: • Émotes',
        ':microphone: • Salons',
        '• Salons textuels :',
        '• Salons vocaux :',
        '• Catégories :'
      ],

      ROLE_MORE_SIZE: size => `et \`${size}\` autre(s)...`,
      EMOTE_MORE_SIZE: size => `et \`${size}\` autre(s)...`,

      // Userinfo
      USERINFO_DESC: 'Donne les information d\'un utilisateur',
      USERINFO_USAGE: prefix => `${prefix}userinfo [@mention / pseudo]`,
      USERINFO_EXEMPLE: prefix => `${prefix}userinfo \n${prefix}userinfo @Moitié prix#4263 \n${prefix}userinfo Moitié`,

      USERINFO_EMBED: [
        '**Informations de l\'utilisateur**',
        ':notepad_spiral: • Général',
        '• Pseudo :',
        '• ID :',
        '• Compte crée le :',
        '• A rejoint le serveur le :',
        '• Statut :',
        ':paperclip: • Divers',
        '• Surnom :',
        '• Joue à :',
        'Aucun jeu',
        '• Rôle le plus élevé :',
        '• Est-ce un bot ?',
        ':gear: • Rôles',
        ':busts_in_silhouette: • Ordre d\'arrivée :',
        ':pencil: • Permissions :',
        'Aucune permission !'
      ],

      // Channelinfo
      CHANNELINFO_DESC: 'Donne les information d\'un salon',
      CHANNELINFO_USAGE: prefix => `${prefix}channelinfo [#salon / ID]`,
      CHANNELINFO_EXEMPLE: prefix => `${prefix}channelinfo \n${prefix}channelinfo #general \n${prefix}channelinfo 123456789098765432`,

      CHANNELINFO_TYPE: {
        text: 'Salon textuel',
        news: 'Salon news',
        store: 'Salon store',
        voice: 'Salon vocal',
        category: 'Categorie',
        unknown: 'Inconnu'
      },

      CHANNELINFO_EMBED: [
        'Aucune description',
        ':notepad_spiral: • Général :',
        '• ID :',
        '• Type :',
        '• Salon crée le :',
        '• Catégorie :',
        ':paperclip: • Divers :',
        '• NSFW ? :',
        'Oui',
        'Non',
        '• Position :',
        '• Slowmode :',
        'Aucun cooldown',
        '• Qualité Audio :',
        '• Limite d\'utilisateurs :',
        'Illimité',
        '• Nombre de salon :',
        ':paperclip: • Salon(s) :',
        'Aucun salon !'
      ],

      //Roleinfo
      ROLEINFO_DESC: 'Donne les information d\'un rôle',
      ROLEINFO_USAGE: prefix => `${prefix}roleinfo [#salon / ID]`,
      ROLEINFO_EXEMPLE: prefix => `${prefix}roleinfo \n${prefix}roleinfo #membre \n${prefix}roleinfo 123456789098765432`,

      ROLEINFO: [
        ':notepad_spiral: • Général :',
        '• ID :',
        '• Couleur :',
        '• Date de création :',
        ':paperclip: • Divers :',
        '• Utilisé par :',
        'membre(s)',
        '• Position :',
        '• Mentionnable ? :',
        '• Rôle séparé ? :',
        ':pencil: • Permissions :',
        'Aucune permission !'
      ],

      // 8ball
      BALL_DESC: 'Répond à tes questions !',
      BALL_USAGE: prefix => `${prefix}8ball <question>`,
      BALL_EXEMPLE: prefix => `${prefix}8ball Suis-je intelligent ?`,
      BALL_ARGS: `${emote.others.no} • Tu dois me poser une question !`,
      BALL_LENGTH: `${emote.others.no} • Ta question ne doit pas dépasser 256 caractères !`,
      BALL_REPLYS: [
        'Oui',
        'Non',
        'Peut-être',
        'Peut-être pas',
        'Je ne sais pas',
        '42',
        ':thinking:',
        'Aucune idée...',
        'Johnathan',
        'Vous savez, moi je ne crois pas qu\'il y ait de bonne ou de mauvaise situation',
        'Je vais demander à Internet Explorer ! Je te donne la réponse dans 3 semaines',
        'La réponse D'
      ],

      // Membercount
      MEMBERCOUNT_DESC: 'Affiche le nombre de membre sur le serveur',
      MEMBERCOUNT_USAGE: prefix => `${prefix}membercount`,

      // Emojify
      EMOJIFY_DESC: 'Envoi ton texte en emoji',
      EMOJIFY_USAGE: prefix => `${prefix}emojify <texte>`,
      EMOJIFY_EXEMPLE: prefix => `${prefix}emojify Comment vas-tu ?`,
      EMOJIFY_ARGS: `${emote.others.no} • Tu dois m'indiquer un texte !`,
      EMOJIFY_LENGTH: `${emote.others.no} • Le texte est trop long ! (100 caractères max.)`,
      EMOJIFY_NOT_VALID: `${emote.others.no} • Seul les caractères suivants sont autorisés : \`a-z A-Z 0-9 !?+÷^?!<>.\``,

      // Encode
      ENCODE_DESC: 'Encode le texte en Base64',
      ENCODE_USAGE: prefix => `${prefix}encode <texte>`,
      ENCODE_EXEMPLE: prefix => `${prefix}encode Comment vas-tu ?`,
      ENCODE_ARGS: `${emote.others.no} • Tu dois m'indiquer un texte !`,
      ENCODE_LENGTH: `${emote.others.no} • Le texte est trop long ! (750 caractères max.)`,
      ENCODE_ENTREE: ':inbox_tray: • Entrée :',
      ENCODE_SORTIE: ':outbox_tray: • Sortie :',

      // Decode
      DECODE_DESC: 'Decode le texte en Base64',
      DECODE_USAGE: prefix => `${prefix}decode <texte>`,
      DECODE_EXEMPLE: prefix => `${prefix}decode Q29tbWVudCB2YXMtdHUgPw==`,
      DECODE_ARGS: `${emote.others.no} • Tu dois m'indiquer un texte à déchiffer !`,
      DECODE_LENGTH: `${emote.others.no} • Le texte est trop long ! (750 caractères max.)`,
      DECODE_ENTREE: ':inbox_tray: • Entrée :',
      DECODE_SORTIE: ':outbox_tray: • Sortie :',
      DECODE_NOT_VALID: 'Base64 non valide !',

      // Sha256
      SHA256_DESC: 'Hash un texte en Sha256',
      SHA256_USAGE: prefix => `${prefix}sha256 <texte>`,
      SHA256_EXEMPLE: prefix => `${prefix}sha256 bonjour`,

      SHA_ARGS: `${emote.others.no} • Tu dois m'indiquer un texte à hash !`,
      SHA_LENGTH: `${emote.others.no} • Le texte est trop long ! (1000 caractères max.)`,
      SHA_ENTREE: ':inbox_tray: • Entrée :',
      SHA_SORTIE: ':outbox_tray: • Sortie :',

      // Sha512
      SHA512_DESC: 'Hash un texte en Sha512',
      SHA512_USAGE: prefix => `${prefix}sha512 <texte>`,
      SHA512_EXEMPLE: prefix => `${prefix}sha512 bonjour`,

      // Tableflip
      TABLE_DESC: 'Tableflip ¯\\_(ツ)_/¯',
      TABLE_USAGE: prefix => `${prefix}tableflip`,

      AUTOMOD: {
        BADWORDS_WARN: `${emote.others.no} • Ce mot n'est pas autorisé ici !`,
        ANTILINK_WARN: `${emote.others.no} • Les liens ne sont pas autorisés ici !`,
        ANTICAPS_WARN: `${emote.others.no} • Le capslock n'est pas autorisé ici !`
      },

      // Weather
      WEATHER_DESC: 'Donne la météo d\'un lieu',
      WEATHER_USAGE: prefix => `${prefix}weather <lieu>`,
      WEATHER_EXEMPLE: prefix => `${prefix}weather Paris`,
      WEATHER_TEMPS: {
        Sunny: 'Soleil',
        Clear: 'Dégagé',
        'Mostly Sunny': 'Assez ensoleillé',
        Cloudy: 'Nuageux',
        'Mostly Cloudy': 'Plutôt nuageux',
        'Light Rain': 'Pluie légère',
        'Partly Sunny': 'Partiellement ensoleillé',
        'T-Storm': 'Tempêtes',
        'Partly Cloudy': 'Partiellement nuageux',
        'Rain Showers': 'Averses de pluie',
        'Light Snow': 'Neige légère',
        'Mostly Clear': 'Plutôt dégagé',
        Rain: 'Pluie',
        Snow: 'Neige'
      },

      WEATHER_ARGS: `${emote.others.no} • Tu dois rentrer une localisation !`,
      WEATHER_VILLE: `${emote.others.no} • Je n\'ai pas trouvé cette ville !`,
      WEATHER_DESCRIPTION: ville => `Météo de **${ville}**`,
      WEATHER_EMBED: [
        ':date: • Météo actuelle :',
        'Température :',
        'Température ressentie :',
        'Vent :',
        'Humidité :',
        ':calendar_spiral: • Prévision à un jour :',
        'Temps :',
        'Température max. :',
        'Température min. :',
        'Chance de précipitation :'
      ],

      // Achievement
      ACHIEVEMENT_DESC: `${emote.others.no} • Tu dois m'indiquer un achievement !`,
      ACHIEVEMENT_USAGE: prefix => `${prefix}achievement <texte>`,
      ACHIEVEMENT_EXEMPLE: prefix => `${prefix}achievement Énigme résolue !`,
      ACHIEVEMENT_ARGS: `${emote.others.no} • Tu dois m\'indiquer un texte !`,
      ACHIEVEMENT_LENGTH: `${emote.others.no} • Tu ne dois pas dépasser 24 caractères !`,

      // Tobecontinued
      TOBECONTINUED_DESC: 'Envoi une photo de profil modifié avec le filtre To be continued !',
      TOBECONTINUED_USAGE: prefix => `${prefix}tobecontinued [@mention / pseudo]`,
      TOBECONTINUED_EXEMPLE: prefix => `${prefix}tobecontinued \n${prefix}tobecontinued @Moitié prix#4263 \n${prefix}tobecontinued Moitié`,

      // Triggered
      TRIGGERED_DESC: 'Envoi une photo de profil modifié avec le filtre Triggered !',
      TRIGGERED_USAGE: prefix => `${prefix}triggered [@mention / pseudo]`,
      TRIGGERED_EXEMPLE: prefix => `${prefix}triggered \n${prefix}triggered @Moitié prix#4263 \n${prefix}triggered Moitié`,

      // Wasted
      WASTED_DESC: 'Envoi une photo de profil modifié avec le filtre Wasted !',
      WASTED_USAGE: prefix => `${prefix}wasted [@mention / pseudo]`,
      WASTED_EXEMPLE: prefix => `${prefix}wasted \n${prefix}wasted @Moitié prix#4263 \n${prefix}wasted Moitié`,

      // Wanted
      WANTED_DESC: 'Envoi une photo de profil modifié avec le filtre Wanted !',
      WANTED_USAGE: prefix => `${prefix}wanted [@mention / pseudo]`,
      WANTED_EXEMPLE: prefix => `${prefix}wanted \n${prefix}wanted @Moitié prix#4263 \n${prefix}wanted Moitié`,

      // Missionpassed
      MISSIONPASSED_DESC: 'Envoi une photo de profil modifié avec le filtre Missionpassed !',
      MISSIONPASSED_USAGE: prefix => `${prefix}missionpassed [@mention / pseudo]`,
      MISSIONPASSED_EXEMPLE: prefix => `${prefix}missionpassed \n${prefix}missionpassed @Moitié prix#4263 \n${prefix}missionpassed Moitié`,

      // Pixel
      PIXEL_DESC: 'Envoi une photo de profil modifié avec le filtre Pixel !',
      PIXEL_USAGE: prefix => `${prefix}pixel [@mention / pseudo]`,
      PIXEL_EXEMPLE: prefix => `${prefix}pixel \n${prefix}pixel @Moitié prix#4263 \n${prefix}pixel Moitié`,

      // Beautiful
      BEAUTIFUL_DESC: 'Envoi une photo de profil modifié avec le filtre Beautiful !',
      BEAUTIFUL_USAGE: prefix => `${prefix}beautiful [@mention / pseudo]`,
      BEAUTIFUL_EXEMPLE: prefix => `${prefix}beautiful \n${prefix}beautiful @Moitié prix#4263 \n${prefix}beautiful Moitié`,

      // Blur
      BLUR_DESC: 'Envoi une photo de profil modifié avec le filtre Blur !',
      BLUR_USAGE: prefix => `${prefix}blur [@mention / pseudo]`,
      BLUR_EXEMPLE: prefix => `${prefix}blur \n${prefix}blur @Moitié prix#4263 \n${prefix}blur Moitié`,

      // Rip
      RIP_DESC: 'Envoi une photo de profil modifié avec le filtre Rip !',
      RIP_USAGE: prefix => `${prefix}rip [@mention / pseudo]`,
      RIP_EXEMPLE: prefix => `${prefix}rip \n${prefix}rip @Moitié prix#4263 \n${prefix}rip Moitié`,

      // Delete
      DELETE_DESC: 'Envoi une photo de profil modifié avec le filtre Rip !',
      DELETE_USAGE: prefix => `${prefix}rip [@mention / pseudo]`,
      DELETE_EXEMPLE: prefix => `${prefix}rip \n${prefix}rip @Moitié prix#4263 \n${prefix}rip Moitié`,

      // Bobross
      BOBROSS_DESC: 'Envoi une photo de profil modifié avec le filtre Rip !',
      BOBROSS_USAGE: prefix => `${prefix}rip [@mention / pseudo]`,
      BOBROSS_EXEMPLE: prefix => `${prefix}rip \n${prefix}rip @Moitié prix#4263 \n${prefix}rip Moitié`,

      // Sepia
      SEPIA_DESC: 'Envoi une photo de profil modifié avec le filtre Sepia !',
      SEPIA_USAGE: prefix => `${prefix}sepia [@mention / pseudo]`,
      SEPIA_EXEMPLE: prefix => `${prefix}sepia \n${prefix}sepia @Moitié prix#4263 \n${prefix}sepia Moitié`,

      // Invert
      INVERT_DESC: 'Envoi une photo de profil modifié avec le filtre Invert !',
      INVERT_USAGE: prefix => `${prefix}invert [@mention / pseudo]`,
      INVERT_EXEMPLE: prefix => `${prefix}invert \n${prefix}invert @Moitié prix#4263 \n${prefix}invert Moitié`,

      // Greyscale
      GREYSCALE_DESC: 'Envoi une photo de profil modifié avec le filtre Greyscale !',
      GREYSCALE_USAGE: prefix => `${prefix}greyscale [@mention / pseudo]`,
      GREYSCALE_EXEMPLE: prefix => `${prefix}greyscale \n${prefix}greyscale @Moitié prix#4263 \n${prefix}greyscale Moitié`,

      // Posterize
      POSTERIZE_DESC: 'Envoi une photo de profil modifié avec le filtre Posterize !',
      POSTERIZE_USAGE: prefix => `${prefix}posterize [@mention / pseudo]`,
      POSTERIZE_EXEMPLE: prefix => `${prefix}posterize \n${prefix}posterize @Moitié prix#4263 \n${prefix}posterize Moitié`,

      // Balance
      BALANCE_DESC: 'Envoi une photo de profil modifié avec le filtre Balance !',
      BALANCE_USAGE: prefix => `${prefix}balance [@mention / pseudo]`,
      BALANCE_EXEMPLE: prefix => `${prefix}balance \n${prefix}balance @Moitié prix#4263 \n${prefix}balance Moitié`,

      // Bravery
      BRAVERY_DESC: 'Envoi une photo de profil modifié avec le filtre Bravery !',
      BRAVERY_USAGE: prefix => `${prefix}bravery [@mention / pseudo]`,
      BRAVERY_EXEMPLE: prefix => `${prefix}bravery \n${prefix}bravery @Moitié prix#4263 \n${prefix}bravery Moitié`,

      // Brilliance
      BRILLIANCE_DESC: 'Envoi une photo de profil modifié avec le filtre Brilliance !',
      BRILLIANCE_USAGE: prefix => `${prefix}brilliance [@mention / pseudo]`,
      BRILLIANCE_EXEMPLE: prefix => `${prefix}brilliance \n${prefix}brilliance @Moitié prix#4263 \n${prefix}brilliance Moitié`,

      // Bill
      BILL_DESC: 'Envoi une photo de profil modifié avec le filtre Bill !',
      BILL_USAGE: prefix => `${prefix}bill [@mention / pseudo]`,
      BILL_EXEMPLE: prefix => `${prefix}bill \n${prefix}bill @Moitié prix#4263 \n${prefix}bill Moitié`,

      // Brazzers
      BRAZZERS_DESC: 'Envoi une photo de profil modifié avec le filtre Brazzers !',
      BRAZZERS_USAGE: prefix => `${prefix}brazzers [@mention / pseudo]`,
      BRAZZERS_EXEMPLE: prefix => `${prefix}brazzers \n${prefix}brazzers @Moitié prix#4263 \n${prefix}brazzers Moitié`,

      // Slap
      SLAP_DESC: 'Envoi une photo de profil modifié avec le filtre Slap !',
      SLAP_USAGE: prefix => `${prefix}slap [@mention / pseudo]`,
      SLAP_EXEMPLE: prefix => `${prefix}slap \n${prefix}slap @Moitié prix#4263 \n${prefix}slap Moitié`,
      SLAP_ARGS: `${emote.others.no} • Tu dois me dire qui claquer ! :p`,

      // Crush
      CRUSH_DESC: 'Envoi une photo de profil modifié avec le filtre Crush !',
      CRUSH_USAGE: prefix => `${prefix}crush [@mention / pseudo]`,
      CRUSH_EXEMPLE: prefix => `${prefix}crush \n${prefix}crush @Moitié prix#4263 \n${prefix}crush Moitié`,
      CRUSH_ARGS: `${emote.others.no} • Tu dois mentionner sur qui tu es en crush :p`,

      // Crush
      DISTRACTED_DESC: 'Envoi une photo de profil modifié avec le filtre Distracted !',
      DISTRACTED_USAGE: prefix => `${prefix}distracted [@mention / pseudo]`,
      DISTRACTED_EXEMPLE: prefix => `${prefix}distracted \n${prefix}distracted @Moitié prix#4263 \n${prefix}distracted Moitié`,
      DISTRACTED_ARGS: `${emote.others.no} • Tu dois me dire qui tu veux regarder !`,

      // Roll
      ROLL_DESC: 'Lance un dé !',
      ROLL_USAGE: prefix => `${prefix}roll`,
      ROLL_EMBED: ':game_die: • Vous êtes tombé sur le...',

      // Rpc
      RPS_DESC: 'Joue à pierre, feuille, ciseaux avec moi !',
      RPS_USAGE: prefix => `${prefix}rpc [rock / paper / scissors]`,
      RPS_EXEMPLE: prefix => `${prefix}rpc \n${prefix}rpc pierre \n${prefix}rpc feuille \n${prefix}ciseaux`,

      RPS_TITLE: 'Pierre, feuille, ciseaux',
      RPS_ARGS: `${emote.others.no} • Argument invalide ! Tu dois choisir entre rock, paper et scissors !`,

      RPS_REPONSES: [
        // Pierre
        ':bricks: • J\'ai également choisi pierre ! Égalité !',
        ':roll_of_paper: • J\'ai choisi feuille ! Tu as perdu !',
        ':scissors: • J\'ai choisi ciseaux ! Tu as gagné !',
        // Feuille
        ':bricks: • J\'ai choisi pierre ! Tu as gagné !',
        ':roll_of_paper: • J\'ai également choisi feuille ! Égalité !',
        ':scissors: • J\'ai choisi ciseaux ! Tu as perdu !',
        // Ciseaux
        ':bricks: • J\'ai choisi pierre ! Tu as perdu !',
        ':roll_of_paper: • J\'ai choisi feuille ! Tu as gagné !',
        ':scissors: • J\'ai également choisi ciseaux ! Égalité !'
      ],

      ////////////////////
      // Commands Owner //
      ////////////////////

      // Blacklist
      BLACKLIST_DESC: 'Paramètres de la blacklist',
      BLACKLIST_USAGE: prefix => `${prefix}blacklist <add | remove> <@mention | id>`,
      BLACKLIST_EXEMPLE: prefix => `${prefix}blacklist add / remove @Moitié_prix / 406135526005932043`,

      // Eval
      EVAL_DESC: `Évaluation d'un code Javascript`,
      EVAL_USAGE: prefix => `${prefix}eval <code>`,
      EVAL_EXEMPLE: prefix => `${prefix}eval message.channel.send('123')`

    }
  }

  /**
   *
   * @param term
   * @param args
   * @returns {string|Function}
   */

  get (term, ...args) {
    const value = this.language[term]
    if (typeof value === 'function') {
      return value(...args)
    } else {
      return value
    }
  }
}
