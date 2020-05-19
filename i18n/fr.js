'use strict'

const emote = require('../utils/emotes.js')

module.exports = class {
  constructor () {
    this.language = {

      // Global
      INFO_PREFIX: prefix => `${emote.others.help} • Salut ! Mon préfixe sur ce serveur est \`${prefix}\`. Effectue la commande \`${prefix}help\` pour obtenir la liste de mes commandes !`,

      UTILS: {
        ERROR: e => `${emote.others.no} • Une erreur est survenue : \`${e}\`, Merci de réesayer plus tard !`,
        API_ERROR: e => `${emote.others.no} • Une erreur est survenue à la génération de l'image : \`${e}\``,
        DATABASE_ERROR: e => `${emote.others.no} • Une erreur est survenu sur la base de donnée : \`${e}\`, Merci de réesayer plus tard !`,
        USER_DEFAUT: `${emote.others.no} • Je ne trouve pas cet utilisateur !`,
        CHANNEL_DEFAUT: `${emote.others.no} • Je ne trouve pas ce salon !`,
        ROLE_DEFAUT: `${emote.others.no} • Je ne trouve pas ce rôle !`,

        TOO_MANY_RESULTS: `${emote.others.no} • Trop de résultats ont été trouvés ! Merci de mentionner l'utilisateur ou d'affiner votre recherche !`,

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
        MASSMENTIONS_WARN: `${emote.others.no} • Ton message contient trop de mentions !`,

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
          Dec: 'Décembre'
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
          DISABLED: 'Aucun',
          MEMBERS_WITHOUT_ROLES: 'Analyse les messages des personnes sans rôle',
          ALL_MEMBERS: 'Analyse tout les messages'
        },

        VERIFICATION_LEVEL: {
          NONE: 'Aucun',
          LOW: 'Faible : Email vérifié',
          MEDIUM: 'Moyen : Inscrit sur Discord depuis 5 min',
          HIGH: 'Élevé : Doit être sur le serveur depuis 10 min',
          VERY_HIGH: 'Extreme : Double authentification requise !'

        },

        MORE_SIZE: size => `et \`${size}\` autre(s)...`,

        ROLES_SIZE_PREMIUM: prefix => `${emote.others.no} • Vous avez atteint la limite de 15 rôles ignorés. Le status premium permet de supprimer cette limite. Plus d'informations sur le serveur support, accessible à l'aide de la commande \`${prefix}support\``,
        CHANNELS_SIZE_PREMIUM: prefix => `${emote.others.no} • Vous avez atteint la limite de 15 salons ignorés. Le status premium permet de supprimer cette limite. Plus d'informations sur le serveur support, accessible à l'aide de la commande \`${prefix}support\``,
        WORDS_SIZE_PREMIUM: prefix => `${emote.others.no} • Vous avez atteint la limite de 25 mots bannis. Le status premium permet de supprimer cette limite. Plus d'informations sur le serveur support, accessible à l'aide de la commande \`${prefix}support\``,
        AUTOROLE_SIZE_PREMIUM: prefix => `${emote.others.no} • Vous avez atteint la limite de 10 rôles ajoutés automatiquement aux nouveaux membres.  Le status premium permet de supprimer cette limite. Plus d'informations sur le serveur support, accessible à l'aide de la commande \`${prefix}support\``,

        FILTER: [
          'cancel • Annuler la recherche',
          `${emote.others.no} • Nombre invalide`,
          `${emote.others.no} • Recherche annulée !`
        ],

        USERFILTER: `${emote.categories.clipboard} • Plusieurs utilisateurs ont été trouvés. \nSelectionnez celui que vous desirez en entrant le nombre à sa gauche`,
        CHANNELFILTER: `${emote.categories.clipboard} • Plusieurs salons ont été trouvés. \nSelectionnez celui que vous desirez en entrant le nombre à sa gauche`,
        ROLEFILTER: `${emote.categories.clipboard} • Plusieurs roles ont été trouvés. \nSelectionnez celui que vous desirez en entrant le nombre à sa gauche`
      },

      LOGS_EVENTS: {
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
        ]
      },

      // Commands options
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
      SETLIMIT: number => `${emote.others.yes} • Le nombre de mentions maximal dans un message a été fixé à \`${number}\``,

      SANCTION: [
        `${emote.others.yes} • Sanction fixé sur : \`Message supprimé\``,
        `${emote.others.yes} • Sanction fixé sur : \`Avertissement de l'auteur\``,
        `${emote.others.yes} • Sanction fixé sur : \`Message supprimé et avertissement\``,
        `${emote.others.no} • Nombre invalide ! \`1, 2 ou 3\``
      ],

      // anticaps.js
      ANTICAPS_USAGE: prefix => `• \`${prefix}anticaps\` - Affiche la liste des arguments disponibles pour l'anti-majuscules \n• \`${prefix}anticaps setup\` - Affiche la configuration de l'anti-majuscules \n• \`${prefix}anticaps set-sanction [1 | 2 | 3]\` - Configure le type de sanction de l'anti-majuscules \n• \`${prefix}anticaps add-role | remove-role <@role | ID de rôle>\` - Ajoute ou supprime des rôles de la liste des rôles ignorés par l'anti-majuscules \n• \`${prefix}anticaps add-channel | remove-channel [#salon | ID de salon]\` - Ajoute ou supprime des salons de la liste des rôles ignorés par l'anti-majuscules`,
      ANTICAPS_EXAMPLE: prefix => `\`${prefix}anticaps set-sanction 2\` \n\`${prefix}anticaps add-role @moderateur\` \n\`${prefix}anticaps remove-role 669986011861745672\` \n\`${prefix}anticaps add-channel #shitpost\` \n\`${prefix}anticaps remove-channel 669967519942967306\``,

      ANTICAPS: [
        `${emote.others.no} • Ce rôle est déjà immunisé !`,
        `${emote.others.no} • Ce rôle n'est pas immunisé !`,
        `${emote.others.no} • Ce salon est déjà immunisé !`,
        `${emote.others.no} • Le salon doit être uniquement textuel !`,
        `${emote.others.no} • Ce salon n'est pas immunisé !`,
        '**Liste des différentes sanctions**',
        '• 1 - Message supprimé \n• 2 - Avertissement de l\'auteur \n• 3 - Messagé supprimé et avertissement',
        '**Configuration de l\'anti-majuscules**',
        'Type de sanction :',
        'Rôles ignorés :',
        'Aucun rôle !',
        'Salons ignorés :',
        'Aucun salon !',
        'Arguments disponibles pour l\'anti-majuscules',
        '• `setup` : Afficher la configuration de l\'anti-majuscules \n• `set-sanction` - Configuer le type de sanction de l\'anti-majuscules \n• `add-role | remove-role` : Ajouter ou supprimer des rôles de la liste des rôles ignorés par l\'anti-majuscules \n• `add-channel | remove-channel` : Ajouter ou supprimer des salons de la liste des rôles ignorés par l\'anti-majuscules'
      ],

      // antilink.js
      ANTILINK_USAGE: prefix => `• \`${prefix}antilink\` - Affiche la liste des arguments disponibles pour l'anti-lien \n• \`${prefix}antilink setup\` - Affiche la configuration de l'anti-lien \n• \`${prefix}antilink set-sanction [1 | 2 | 3]\` - Configure le type de sanction de l'anti-lien \n• \`${prefix}antilink add-role | remove-role <@role | ID de rôle>\` - Ajoute ou supprime des rôles de la liste des rôles ignorés par l'anti-lien \n• \`${prefix}antilink add-channel | remove-channel [#salon | ID de salon]\` - Ajoute ou supprime des salons de la liste des rôles ignorés par l'anti-lien`,
      ANTILINK_EXAMPLE: prefix => `\`${prefix}antilink set-sanction 2\` \n\`${prefix}antilink add-role @moderateur\` \n\`${prefix}antilink remove-role 669986011861745672\` \n\`${prefix}antilink add-channel #shitpost\` \n\`${prefix}antilink remove-channel 669967519942967306\``,

      ANTILINK: [
        `${emote.others.no} • Tu dois m'indiquer un rôle valide !`,
        `${emote.others.no} • Ce rôle est déjà immunisé !`,
        `${emote.others.no} • Ce rôle n'est pas immunisé !`,
        `${emote.others.no} • Tu dois m'indiquer un salon valide !`,
        `${emote.others.no} • Ce salon est déjà immunisé !`,
        `${emote.others.no} • Le salon doit être uniquement textuel !`,
        `${emote.others.no} • Ce salon n'est pas immunisé !`,
        '**Liste des différentes sanctions**',
        '• 1 - Message supprimé \n• 2 - Avertissement de l\'auteur \n• 3 - Messagé supprimé et avertissement',
        '**Configuration de l\'anti-lien**',
        'Type de sanction :',
        'Rôles ignorés :',
        'Aucun rôle !',
        'Salons ignorés :',
        'Aucun salon !',
        '**Arguments disponibles pour l\'anti-lien**',
        '• `setup` : Afficher la configuration de l\'anti-lien \n• `set-sanction` - Configuer le type de sanction de l\'anti-lien \n• `add-role | remove-role` : Ajouter ou supprimer des rôles de la liste des rôles ignorés par l\'anti-lien \n• `add-channel | remove-channel` : Ajouter ou supprimer des salons de la liste des rôles ignorés par l\'anti-lien'
      ],

      // autorole.js
      AUTOROLE_USAGE: prefix => `• \`${prefix}autorole\` - Affiche la liste des arguments disponibles pour l'autorole \n• \`${prefix}autorole roles\` - Affiche la liste des rôles de l'autorole \n• \`${prefix}autorole add-role | remove-role <@role | ID de rôle>\` - Ajoute ou supprime des rôles de la liste des rôles ajoutés à l'arrivé d'un membre sur le serveur \n${emote.others.caution} • Attention, pour que l'autorole fonctionne, le bot doit avoir un rôle plus élevé que le rôle donnée. Dans le cas contraire, le bot ne pourra pas donner le rôle à l'arrivée d'un membre.`,
      AUTOROLE_EXAMPLE: prefix => `\`${prefix}autorole add-role @membre\` \n\`${prefix}autorole remove-role 669986011861745672\``,

      AUTOROLE: [
        `${emote.others.no} • Tu dois m'indiquer un rôle valide !`,
        `${emote.others.no} • Ce rôle est déjà dans la liste de l'autorole !`,
        `${emote.others.no} • Je ne possède pas un rôle assez élevé pour donner automatiquement ce rôle !`,
        `${emote.others.no} • Ce rôle n'est pas dans la liste de l'autorole !`,
        '**Liste des rôles de l\'autorole**',
        'Aucun rôle !',
        '**Arguments disponibles pour l\'autorole**',
        '• `roles` : Afficher la liste des rôles ajoutés à un membre lors de son arrivé \n• `addrole | removerole` : Ajouter ou supprimer des rôles de la liste des rôles ajoutés à un membre lors de son arrivé'
      ],

      AUTOROLE_ADDROLE: role => `${emote.others.yes} • Le rôle <@&${role}> a bien été ajouté à la liste de l'autorole`,
      AUTOROLE_REMOVEROLE: role => `${emote.others.yes} • Le rôle <@&${role}> a bien été retiré de la liste de l'autorole`,

      // badwords.js
      BADWORDS_USAGE: prefix => `• \`${prefix}badwords\` - Affiche la liste des arguments disponibles pour l'anti-badwords \n• \`${prefix}badwords setup\` - Affiche la configuration de l'anti-badwords \n• \`${prefix}badwords set-sanction [1 | 2 | 3]\` - Configure le type de sanction de l'anti-badwords \n• \`${prefix}badwords add-role | remove-role <@role | ID de rôle>\` - Ajoute ou supprime des rôles de la liste des rôles ignorés par l'anti-badwords \n• \`${prefix}badwords add-channel | remove-channel [#salon | ID de salon]\` - Ajoute ou supprime des salons de la liste des rôles ignorés par l'anti-badwords \n• \`${prefix}badwords add-word | remove-word <mot>\` - Ajoute ou supprime des mots bannis`,
      BADWORDS_EXAMPLE: prefix => `\`${prefix}badwords set-sanction 2\` \n\`${prefix}badwords\` \n\`${prefix}badwords add-role @moderateur\` \n\`${prefix}badwords remove-role 669986011861745672\` \n\`${prefix}badwords add-channel #shitpost\` \n\`${prefix}badwords remove-channel 669967519942967306\` \n\`${prefix}badwords add-word merde\` \n\`${prefix}badwords remove-word merde\``,

      BADWORDS: [
        `${emote.others.no} • Tu dois m'indiquer un rôle valide !`,
        `${emote.others.no} • Ce rôle est déjà immunisé !`,
        `${emote.others.no} • Ce rôle n'est pas immunisé !`,
        `${emote.others.no} • Tu dois m'indiquer un salon valide !`,
        `${emote.others.no} • Ce salon est déjà immunisé !`,
        `${emote.others.no} • Le salon doit être uniquement textuel !`,
        `${emote.others.no} • Ce salon n'est pas immunisé !`,
        `${emote.others.no} • Tu dois m'indiquer un mot !`,
        `${emote.others.no} • Ce mot est déjà banni !`,
        `${emote.others.no} • Ce mot n'est pas banni !`,
        '**Liste des différentes sanctions**',
        '• 1 - Message supprimé \n• 2 - Avertissement de l\'auteur \n• 3 - Messagé supprimé et avertissement',
        '**Configuration de l\'anti-badwords**',
        'Type de sanction :',
        'Mots bannis :',
        'Aucun mot',
        'Rôles ignorés :',
        'Aucun rôle !',
        'Salons ignorés :',
        'Aucun salon !',
        '**Arguments disponibles pour l\'anti-badwords**',
        '• `setup` : Afficher la configuration de l\'anti-badwords \n• `set-sanction` : Configuer le type de sanction de l\'anti-badwords \n• `add-role | remove-role` : Ajouter ou supprimer des rôles de la liste des rôles ignorés par l\'anti-badwords \n• `add-channel | remove-channel` : Ajouter ou supprimer des salons de la liste des rôles ignorés par l\'anti-badwords \n• `add-word | remove-word` : Ajouter ou supprimer des mots bannis'
      ],

      // language.js
      LANGUAGE_USAGE: prefix => `• \`${prefix}language\` - Affiche les différentes langues disponibles pour Hydrobot \n• \`${prefix}language [fr | en | reset]\` - Configue la langue pour hydrobot`,
      LANGUAGE_EXAMPLE: prefix => `• \`${prefix}language fr\``,

      // logs.js
      LOGS_USAGE: prefix => `• \`${prefix}logs\` - Affiche la liste des arguments disponibles pour la commande logs \n• \`${prefix}logs [list]\` - Affiche la liste des logs \n• \`${prefix}logs set-channel <#salon | ID de salon>\` - Configure le salon d'envoi des logs \n• \`${prefix}logs [log]\` - Active / désactive un log \n• \`${prefix}logs enable-all | disable-all\` - Active ou désactive l'intégralité des logs`,
      LOGS_EXEMPLE: prefix => `\`${prefix}logs setchannel 123456789876543210\` \n\`${prefix}logs messageDelete\``,
      LOGS_ENABLE: plugin => `${emote.others.yes} • Le plugin \`${plugin}\` a été activé !`,
      LOGS_DISABLE: plugin => `${emote.others.yes} • Le plugin \`${plugin}\` a été désactivé !`,
      LOGS_ARGS: `${emote.others.no} • Argument invalide !`,
      LOGS_CHANNEL: channel => `${emote.others.yes} • <#${channel}> est désormais le salon d'envoi pour les logs !`,

      LOGS: [
        `${emote.others.yes} • Tout les logs ont été activés !`,
        `${emote.others.yes} • Tout les logs ont été désactivés !`,
        '**Arguments disponibles pour la commande logs**',
        '• `nom du log` - Activer ou désactiver le log mentionné \n• `set-channel` - Configurer le salon d\'envoi des logs \n• `enable-all | disable-all` - Activer ou désactiver l\'intégralité des logs'
      ],

      // mass-mentions.js
      MASSMENTIONS_USAGE: prefix => `• \`${prefix}mass-mentions\` - Affiche la liste des arguments disponibles pour l'anti-mass-mentions \n• \`${prefix}mass-mentions setup\` - Affiche la configuration de l'anti-mass-mentions \n• \`${prefix}mass-mentions set-sanction [1 | 2 | 3]\` - Configure le type de sanction de l'anti-mass-mentions \n• \`${prefix}mass-mentions set-limit <nombre>\` - Configure le nombre maximal de mentions par message \n• \`${prefix}mass-mentions add-role | remove-role <@role | ID de rôle>\` - Ajoute ou supprime des rôles de la liste des rôles ignorés par l'anti-mass-mentions \n• \`${prefix}mass-mentions add-channel | remove-channel <#salon | ID de salon>\` - Ajoute ou supprime des salons de la liste des rôles ignorés par l'anti-mass-mentions`,
      MASSMENTIONS_EXAMPLE: prefix => `\`${prefix}mass-mentions set-sanction 2\` \n\`${prefix}mass-mentions set-limit 5\` \n\`${prefix}mass-mentions add-role @moderateur\` \n\`${prefix}mass-mentions remove-role 669986011861745672\` \n\`${prefix}mass-mentions add-channel #shitpost\` \n\`${prefix}mass-mentions remove-channel 669967519942967306\``,

      MASSMENTION: [
        `${emote.others.no} • Tu dois m'indiquer un rôle valide !`,
        `${emote.others.no} • Ce rôle est déjà immunisé !`,
        `${emote.others.no} • Ce rôle n'est pas immunisé !`,
        `${emote.others.no} • Tu dois m'indiquer un salon valide !`,
        `${emote.others.no} • Ce salon est déjà immunisé !`,
        `${emote.others.no} • Le salon doit être uniquement textuel !`,
        `${emote.others.no} • Ce salon n'est pas immunisé !`,
        `${emote.others.no} • Tu dois m'indiquer un nombre entier valide !`,
        `${emote.others.no} • Le nombre doit être inclue entre 1 et 20 !`,
        '**Liste des différentes sanctions**',
        '• 1 - Message supprimé \n• 2 - Avertissement de l\'auteur \n• 3 - Messagé supprimé et avertissement',
        '**Configuration de l\'anti-mass-mentions**',
        'Type de sanction :',
        'Rôles ignorés :',
        'Aucun rôle !',
        'Salons ignorés :',
        'Aucun salon !',
        'Arguments disponibles pour l\'anti-majuscules',
        '• `setup` : Afficher la configuration de l\'anti-mass-mentions \n• `set-sanction` - Configuer le type de sanction de l\'anti-mass-mentions \n• `set-limit` - Configurer le nombre maximal de mentions par message \n• `add-role | remove-role` : Ajouter ou supprimer des rôles de la liste des rôles ignorés par l\'anti-mass-mentions \n• `add-channel | remove-channel` : Ajouter ou supprimer des salons de la liste des rôles ignorés par l\'anti-mass-mentions'
      ],

      // plugin.js
      PLUGIN_USAGE: prefix => `• \`${prefix}plugin\` - Affiche la liste des arguments disponibles pour la commande plugin \n• \`${prefix}plugin [list]\` - Affiche la liste des plugins \n• \`${prefix}plugin [plugin]\` - Active / désactive un plugin \n• \`${prefix}plugin enable-all | disable-all\` - Active ou désactive l'intégralité des plugins`,
      PLUGIN_EXAMPLE: prefix => `\`${prefix}plugin logs\``,
      PLUGIN_ENABLE: plugin => `${emote.others.yes} • Le plugin \`${plugin}\` a été activé !`,
      PLUGIN_DISABLE: plugin => `${emote.others.yes} • Le plugin \`${plugin}\` a été désactivé !`,
      PLUGIN_ARGS: `${emote.others.no} • Argument invalide !`,

      PLUGIN: [
        `${emote.others.yes} • Tout les plugins ont été activés !`,
        `${emote.others.yes} • Tout les plugins ont été désactivés !`,
        '**Arguments disponibles pour la commande plugin**',
        '• `nom du plugin` - Activer ou désactiver le plugin mentionné \n• `enable-all | disable-all` - Activer ou désactiver l\'intégralité des plugins'
      ],

      // prefix.js
      PREFIX_USAGE: prefix => `• \`${prefix}prefix <préfixe>\` - Modifie le prefix d'Hydrobot sur le serveur`,
      PREFIX_EXAMPLE: prefix => `\`${prefix}prefix ?\``,
      PREFIX_CHANGE_DESC: args => `Le préfixe a bien été changé pour \`${args[0]}\``,

      PREFIX: [
        `${emote.others.no} • Tu dois m'indiquer un préfixe !`,
        `${emote.others.no} • Le préfixe ne doit pas contenir plus de 3 caractères`,
        `${emote.others.no} • Certains caractères ne sont pas autorisés (Les caractères autorisés sont : a-z, A-Z, !?;:*-+=$/@)`,
        `${emote.others.yes} • Changement de préfixe`
      ],

      // FUN //

      // 8ball.js
      BALL_USAGE: prefix => `• \`${prefix}8ball <question>\` - Pose moi ta question, j'y répondrais !`,
      BALL_EXAMPLE: prefix => `\`${prefix}8ball Suis-je intelligent ?\``,
      BALL: [
        `${emote.others.no} • Tu dois me poser une question !`,
        `${emote.others.no} • Ta question ne doit pas dépasser 256 caractères !`
      ],
      BALL_ANSWERS: [
        'Oui',
        'Non',
        'Peut-être',
        'Peut-être pas',
        'Je ne sais pas',
        'C\'est une question qui mérite réflexion !',
        '42',
        ':thinking:',
        'Aucune idée...',
        'Johnathan',
        'Vous savez, moi je ne crois pas qu\'il y ait de bonne ou de mauvaise situation',
        'Je vais demander à Internet Explorer ! Je te donne la réponse dans 3 semaines',
        'La réponse D',
        'Tu bluff Martoni !',
        'Comme si, comme ça'
      ],

      // decode.js
      DECODE_USAGE: prefix => `• \`${prefix}decode <texte>\` - Décode un texte encodé en base64 (${emote.others.caution} • Certains caractères ne sont pas supportés par Discord)`,
      DECODE_EXAMPLE: prefix => `\`${prefix}decode Q29tbWVudCB2YXMtdHUgPw==\``,
      DECODE: [
        `${emote.others.no} • Tu dois m'indiquer un texte à déchiffer !`,
        `${emote.others.no} • Le texte est trop long ! (750 caractères max.)`,
        'Base64 non valide !',
        ':inbox_tray: • Entrée :',
        ':outbox_tray: • Sortie :'
      ],

      // emojify.js
      EMOJIFY_USAGE: prefix => `• \`${prefix}emojify <texte>\` - Transforme ton texte en emojis ! `,
      EMOJIFY_EXAMPLE: prefix => `\`${prefix}emojify Comment vas tu ?\``,
      EMOJIFY: [
        `${emote.others.no} • Tu dois m'indiquer un texte !`,
        `${emote.others.no} • Seul les caractères suivants sont autorisés : \`a-z A-Z 0-9 !?+÷^?!<>.-\``,
        `${emote.others.no} • Le texte est trop long ! (100 caractères max.)`
      ],

      // encode.js
      ENCODE_USAGE: prefix => `• \`${prefix}encode <texte>\` - Encode un texte en base64`,
      ENCODE_EXAMPLE: prefix => `${prefix}encode Comment vas-tu ?`,
      ENCODE: [
        `${emote.others.no} • Tu dois m'indiquer un texte !`,
        `${emote.others.no} • Le texte est trop long ! (750 caractères max.)`,
        ':inbox_tray: • Entrée :',
        ':outbox_tray: • Sortie :'
      ],

      // roll.js
      ROLL_USAGE: prefix => `• \`${prefix}roll\` - Lance un dé`,
      ROLL_EXAMPLE: prefix => `\`${prefix}roll\``,
      ROLL: ':game_die: • Vous êtes tombé sur le...',

      // rps.js
      RPS_USAGE: prefix => `• \`${prefix}rpc <rock | paper | scissors>\` - Joue à pierre, feuille, ciseaux avec moi !`,
      RPS_EXAMPLE: prefix => `\`${prefix}rpc rock\` \n\`${prefix}rpc paper\` \n\`${prefix}scissors\``,

      RPS: [
        `${emote.others.no} • Argument invalide ! Tu dois choisir entre \`rock\`, \`paper\` et \`scissors\` !`,
        'Pierre, feuille, ciseaux',
        ':bricks: • J\'ai également choisi pierre ! Égalité !',
        ':roll_of_paper: • J\'ai choisi feuille ! Tu as perdu !',
        ':scissors: • J\'ai choisi ciseaux ! Tu as gagné !',
        ':bricks: • J\'ai choisi pierre ! Tu as gagné !',
        ':roll_of_paper: • J\'ai également choisi feuille ! Égalité !',
        ':scissors: • J\'ai choisi ciseaux ! Tu as perdu !',
        ':bricks: • J\'ai choisi pierre ! Tu as perdu !',
        ':roll_of_paper: • J\'ai choisi feuille ! Tu as gagné !',
        ':scissors: • J\'ai également choisi ciseaux ! Égalité !'
      ],

      // Sha
      SHA: [
        `${emote.others.no} • Tu dois m'indiquer un texte à hash !`,
        `${emote.others.no} • Le texte est trop long ! (1000 caractères max.)`,
        ':inbox_tray: • Entrée :',
        ':outbox_tray: • Sortie :'
      ],

      // sha256.js
      SHA256_USAGE: prefix => `• \`${prefix}sha256 <texte>\` - Hash un texte en SHA-256`,
      SHA256_EXAMPLE: prefix => `\`${prefix}sha256 bonjour\``,

      // sha512.js
      SHA512_USAGE: prefix => `• \`${prefix}sha512 <texte>\` - Hash un texte en SHA-512`,
      SHA512_EXAMPLE: prefix => `\`${prefix}sha512 bonjour\``,

      // tableflip.js
      TABLEFLIP_USAGE: prefix => `• \`${prefix}tableflip\` - Retourne une table ! ┬─┬ ノ( ゜-゜ノ)`,
      TABLEFLIP_EXAMPLE: prefix => `\`${prefix}tableflip\``,

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
        ':robot: • Version Hydrobot :'
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
        'Bande passante non ajustée :'
      ],

      // IMAGES //

      // achievement.js
      ACHIEVEMENT_USAGE: prefix => `• \`${prefix}achievement <texte>\` - Afficher ton texte dans un achievement Minecraft`,
      ACHIEVEMENT_EXAMPLE: prefix => `\`${prefix}achievement Énigme résolue !\``,
      ACHIEVEMENT: [
        `${emote.others.no} • Tu dois m'indiquer un texte !`,
        `${emote.others.no} • Ton texte ne dois pas dépasser 24 caractères !`
      ],

      IMAGE_USAGE: (prefix, command) => `• \`${prefix}${command} [@mention | ID d'utisateur | pseudo]\` - Envoi une photo de profil modifiée avec le modèle ${command} !`,
      IMAGE_EXAMPLE: (prefix, command) => `\`${prefix}${command} @Moitié prix#4263\` \n\`${prefix}${command} 406135526005932043\` \n\`${prefix}${command} Moitié\``,

      // slap.js
      SLAP_ARGS: `${emote.others.no} • Tu dois me dire qui claquer ! :p`,

      // crush.js
      CRUSH_ARGS: `${emote.others.no} • Tu dois me dire sur qui tu es en crush ! :p`,

      // distracted.js
      DISTRACTED_ARGS: `${emote.others.no} • Tu dois me dire qui tu veux regarder !`,

      // INFORMATION //

      // avatar.js
      AVATAR_USAGE: prefix => `\`${prefix}avatar [@mention | ID d'utisateur | pseudo]\` - Envoi l'avatar de l'utilisateur`,
      AVATAR_EXAMPLE: prefix => `\`${prefix}avatar @Moitié prix#4263\` \n\`${prefix}avatar 406135526005932043\` \n\`${prefix}avatar Moitié\``,

      // channelinfo.js
      CHANNELINFO_USAGE: prefix => `\`${prefix}channelinfo [#salon | ID de salon | nom du salon]\` - Envoi les informations générales du salon`,
      CHANNELINFO_EXAMPLE: prefix => `\`${prefix}channelinfo #general\` \`\n${prefix}channelinfo 123456789098765432\` \n\`${prefix}channelinfo general\``,

      CHANNELINFO_TYPE: {
        text: 'Salon textuel',
        news: 'Salon news',
        store: 'Salon store',
        voice: 'Salon vocal',
        category: 'Categorie',
        unknown: 'Inconnu'
      },

      CHANNELINFO: [
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

      // emojis.js
      EMOTE_USAGE: prefix => `\`${prefix}emojis\` - Affiche la liste des emojis du serveur \n\`${prefix}emojis [emote]\` - Affiche les informations de l'emoji`,
      EMOTE_EXAMPLE: prefix => `\`${prefix}emojis :kappa:\``,

      EMOTE_TITLE: (guild, size) => `Emojis du serveur **${guild}** (${size})`,
      EMOTE: [
        '• Nom :',
        '• Créateur :',
        '• Date de création :',
        '• Est t\'il animé ?',
        '• Lien :',
        'Clique ici !',
        'Oui',
        'Non',
        ':notepad_spiral: • Général',
        '• ID :',
        `${emote.others.no} • Cet emoji n'est pas reconnu !`,
        'Aucun emote n\'est present sur ce serveur'
      ],

      // membercount.js
      MEMBERCOUNT_USAGE: prefix => `\`${prefix}membercount\` - Affiche le nombre de membre sur le serveur`,
      MEMBERCOUNT_EXAMPLE: prefix => `\`${prefix}membercount\``,

      // permissions.js
      PERMISSIONS_USAGE: prefix => `${prefix}permissions [@mention | ID d'utisateur | pseudo] - Envoi les permissions de l'utilisateur du salon de la commande`,
      PERMISSIONS_EXAMPLE: prefix => `\`${prefix}permissions @Moitié prix#4263\` \n\`${prefix}permissions 406135526005932043\` \n\`${prefix}permissions Moitié\``,

      // roleinfo.js
      ROLEINFO_USAGE: prefix => `\`${prefix}roleinfo [#salon | ID de rôle | nom du role]\` - Envoi les informations générales du rôle`,
      ROLEINFO_EXAMPLE: prefix => `\`${prefix}roleinfo @membre\` \n\`${prefix}roleinfo 669986011861745672\` \n\`${prefix}roleinfo membre\``,

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

      // serverinfo.js
      SERVERINFO_USAGE: prefix => `\`${prefix}serverinfo\` - Envoi les informations générales du serveur`,
      SERVERINFO_EXAMPLE: prefix => `\`${prefix}serverinfo\``,

      SERVERINFO: [
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

      // userinfo.js
      USERINFO_USAGE: prefix => `\`${prefix}userinfo [@mention | ID d'utilisateur | pseudo]\` - Envoi les informations générales de l'utilisateur`,
      USERINFO_EXAMPLE: prefix => `\`${prefix}userinfo @Moitié prix#4263\` \n\`${prefix}userinfo 406135526005932043\` \n${prefix}userinfo Moitié`,

      USERINFO: [
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

      // MODERATION //

      // NSFW //

      // OTHERS //

      // OWNER //

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
      WEATHER_VILLE: `${emote.others.no} • Je n'ai pas trouvé cette ville !`,
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

      // Blacklist
      BLACKLIST_DESC: 'Paramètres de la blacklist',
      BLACKLIST_USAGE: prefix => `${prefix}blacklist <add | remove> <@mention | id>`,
      BLACKLIST_EXEMPLE: prefix => `${prefix}blacklist add / remove @Moitié_prix / 406135526005932043`,

      // Eval
      EVAL_DESC: 'Évaluation d\'un code Javascript',
      EVAL_USAGE: prefix => `${prefix}eval <code>`,
      EVAL_EXEMPLE: prefix => `${prefix}eval message.channel.send('123')`

    }
  }

  get (term, ...args) {
    const value = this.language[term]
    if (typeof value === 'function') {
      return value(...args)
    } else {
      return value
    }
  }
}
