require.config({
    // Le paramètre baseUrl permet de spécifier un
    // préfixe à appliquer à tous les chemins
    // qu'utilisera RequireJS pour résoudre les chemins
    // d'accès aux modules. S'il n'est pas précisé,
    // tous les chemins sont résolus par rapport à
    // l'emplacement du fichier main.js. Dans cet
    // exemple on considère que tous nos modules sont
    // dans le répertoire 'lib', lui même au même
    // niveau que notre fichier main.js
    baseUrl: '../../scripts/core',

    // l'objet path va permettre de faire une
    // association entre un nom de module et son
    // chemin d'accès. Si vous ne faite pas ça,
    // RequireJS considère que le nom d'un module
    // est le nom du fichier (sans l'extension .js)
    // précédé de son chemin relatif par rapport au
    // fichier main.js
    path: {
        // Ici, avec notre baseUrl, on indique que le
        // fichier qui contient jQuery est situé à
        // l'emplacement: ./lib/vendors/jquery.min.js
        //'Geometry': 'geometry',
        //'Browser': 'browser',
        //'Types': 'types',
        //'Ext_array': 'ext_array',
        //'Ext_string': 'ext_string',
        //'Ext_math': 'ext_math',
        //'Ext_date': 'ext_date',
        //'Events': 'events',
        //'Convertion': 'convertion',
        //'Mouse_keyboard': 'mouse_keyboard',
        //'Canvas': 'canvas',
        //'Classes': 'classes',
        //'Colors': 'colors',
        //'Core': 'core',
        //'Looper': 'looper',
        //'Apps': 'apps',
        //'Tools': 'tools'


    },

    // l'objet shim va permettre de spécifier les
    // dépendances entre fichiers qui n'utilisent
    // pas la fonction define et associer d'éventuelles
    // variables globales à un nom de module.
    shim: {
        // Pour les scripts qui exposent une variable
        // globale il faut la déclarer explicitement
    }
});
require(
    ["core", "geometry", "browser", "types", "ext_array", "ext_string", "ext_math", "ext_date", "events", "convertion", "keyboard", "tools", "mouse", "canvas",
     "font", "bezierUtils", "xml", "xhr", "uri", "text", "sorter", "cookie", "event"],
    function (Core) {
        //window.Application = null;
        //renderer: (document.documentElement.dataset.renderer !== undefined) ? document.documentElement.dataset.renderer : "html",
        Core.start();
    },
    function (err) {
        console.error('ERROR: ', err.requireType);
        console.error('MODULES: ', err.requireModules);
        console.error('STACK: ', err.stack);
    }
);