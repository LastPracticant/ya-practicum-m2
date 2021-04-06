import arrayToTree from 'array-to-tree';
import { ForumTopicCommentProps } from './Forum.types';

interface ForumTopicProps {
    id: number
    topic: string
    reviews: number
    answers: number
    author: string
}

export const TOPICS: ForumTopicProps[] = [{
    id: 1, topic: 'Progressive user-facing groupware', reviews: 46, answers: 95, author: 'Aube Danielski',
},
{
    id: 2, topic: 'Total national adapter', reviews: 1, answers: 47, author: 'Giorgi Seabrooke',
},
{
    id: 3, topic: 'Re-engineered logistical projection', reviews: 9, answers: 81, author: 'Gottfried Velten',
},
{
    id: 4, topic: 'Multi-tiered directional hierarchy', reviews: 12, answers: 28, author: 'Allen Darlasson',
},
{
    id: 5, topic: 'Adaptive actuating encryption', reviews: 3, answers: 47, author: 'Edd Welfair',
},
{
    id: 6, topic: 'Ergonomic responsive array', reviews: 79, answers: 100, author: 'Nona Bugs',
},
{
    id: 7, topic: 'Implemented incremental implementation', reviews: 54, answers: 81, author: 'Helene Bolin',
},
{
    id: 8, topic: 'User-friendly interactive paradigm', reviews: 71, answers: 43, author: 'Henrik Wadham',
},
{
    id: 9, topic: 'Realigned background moratorium', reviews: 29, answers: 69, author: 'Aloysia Kleinplatz',
},
{
    id: 10, topic: 'Ergonomic actuating monitoring', reviews: 5, answers: 52, author: 'Fancie Conningham',
},
{
    id: 11, topic: 'User-friendly human-resource attitude', reviews: 34, answers: 47, author: 'Arnie Frisch',
},
{
    id: 12, topic: 'Networked static adapter', reviews: 57, answers: 74, author: 'Morty Ollerhad',
},
{
    id: 13, topic: 'Streamlined uniform intranet', reviews: 11, answers: 67, author: 'Philipa Moorman',
},
{
    id: 14, topic: 'Triple-buffered directional matrix', reviews: 33, answers: 3, author: 'Casey Cocksedge',
},
{
    id: 15, topic: 'Face to face solution-oriented middleware', reviews: 67, answers: 32, author: 'Crichton Klemencic',
},
{
    id: 16, topic: 'Networked zero defect help-desk', reviews: 12, answers: 8, author: 'Gerhard Menichini',
},
{
    id: 17, topic: 'Horizontal tertiary secured line', reviews: 75, answers: 37, author: 'Oates Brims',
},
{
    id: 18, topic: 'Organic directional framework', reviews: 93, answers: 98, author: 'Jolie Lahy',
},
{
    id: 19, topic: 'Streamlined 6th generation framework', reviews: 16, answers: 67, author: 'Bibbie Medcalfe',
},
{
    id: 20, topic: 'Integrated real-time database', reviews: 79, answers: 51, author: 'Jeremie Flawn',
},
{
    id: 21, topic: 'Compatible attitude-oriented installation', reviews: 66, answers: 6, author: "Carmine O' Dooley",
},
{
    id: 22, topic: 'Quality-focused composite solution', reviews: 80, answers: 24, author: 'Brooks Pyford',
},
{
    id: 23, topic: 'Operative system-worthy help-desk', reviews: 35, answers: 9, author: 'Lettie Whitticks',
},
{
    id: 24, topic: 'Ergonomic contextually-based paradigm', reviews: 96, answers: 7, author: 'Oates Brosio',
},
{
    id: 25, topic: 'Open-architected transitional functionalities', reviews: 5, answers: 83, author: 'Dilly Fussen',
},
{
    id: 26, topic: 'Persistent discrete forecast', reviews: 8, answers: 66, author: 'Carley Size',
},
{
    id: 27, topic: 'Devolved tertiary application', reviews: 79, answers: 73, author: 'Maddie Symcock',
},
{
    id: 28, topic: 'Realigned bottom-line moderator', reviews: 83, answers: 85, author: 'Garwin Spencook',
},
{
    id: 29, topic: 'Proactive non-volatile project', reviews: 98, answers: 16, author: 'Jeremias Wankel',
},
{
    id: 30, topic: 'Triple-buffered fault-tolerant help-desk', reviews: 15, answers: 17, author: 'Justis Hummerston',
},
{
    id: 31, topic: 'Phased foreground info-mediaries', reviews: 87, answers: 16, author: 'Mortimer Burgyn',
},
{
    id: 32, topic: 'Assimilated solution-oriented initiative', reviews: 30, answers: 43, author: 'Tristan Hembry',
},
{
    id: 33, topic: 'Centralized logistical algorithm', reviews: 8, answers: 67, author: 'Donny Perillio',
},
{
    id: 34, topic: 'Re-engineered user-facing portal', reviews: 31, answers: 10, author: 'Janis Claque',
},
{
    id: 35, topic: 'Digitized interactive task-force', reviews: 89, answers: 74, author: 'Mellicent Brissard',
},
{
    id: 36, topic: 'Profound scalable support', reviews: 70, answers: 45, author: 'Tabby Swanborough',
},
{
    id: 37, topic: 'Multi-layered object-oriented circuit', reviews: 88, answers: 54, author: 'Tuck Stockey',
},
{
    id: 38, topic: 'Synergized dynamic firmware', reviews: 59, answers: 34, author: 'Oriana Lumsdall',
},
{
    id: 39, topic: 'Phased 4th generation local area network', reviews: 19, answers: 24, author: 'Dinny Spong',
},
{
    id: 40, topic: 'User-friendly 4th generation installation', reviews: 85, answers: 55, author: 'Rodolphe Orniz',
},
{
    id: 41, topic: 'Switchable dedicated array', reviews: 29, answers: 33, author: 'Amy Elrick',
},
{
    id: 42, topic: 'Fundamental holistic collaboration', reviews: 12, answers: 90, author: 'Tate Lochhead',
},
{
    id: 43, topic: 'Cross-platform multi-state open architecture', reviews: 12, answers: 14, author: 'Jimmy Stanworth',
},
{
    id: 44, topic: 'Reactive non-volatile moderator', reviews: 23, answers: 95, author: 'Antons Wogdon',
},
{
    id: 45, topic: 'Automated client-driven leverage', reviews: 18, answers: 63, author: 'Hubey Potts',
},
{
    id: 46, topic: 'Re-engineered multi-tasking matrix', reviews: 57, answers: 48, author: 'Dwight Buckie',
},
{
    id: 47, topic: 'Front-line demand-driven circuit', reviews: 27, answers: 57, author: 'Agatha Bedding',
},
{
    id: 48, topic: 'Grass-roots systematic framework', reviews: 30, answers: 25, author: 'Enrichetta Boxhill',
},
{
    id: 49, topic: 'Quality-focused composite algorithm', reviews: 83, answers: 69, author: "Frasquito O' Shea",
},
{
    id: 50, topic: 'Profit-focused well-modulated instruction set', reviews: 96, answers: 2, author: 'Thedrick Pietri',
},
{
    id: 51, topic: 'Decentralized secondary functionalities', reviews: 98, answers: 11, author: 'Jaimie Mecozzi',
},
{
    id: 52, topic: 'Multi-channelled upward-trending groupware', reviews: 32, answers: 66, author: 'Emmie Schirok',
},
{
    id: 53, topic: 'Managed user-facing open architecture', reviews: 74, answers: 43, author: 'Winne Gaize',
},
{
    id: 54, topic: 'Stand-alone incremental collaboration', reviews: 49, answers: 36, author: 'Desirae Huckleby',
},
{
    id: 55, topic: 'Re-engineered 4th generation challenge', reviews: 34, answers: 19, author: 'Xymenes Gillebride',
},
{
    id: 56, topic: 'Digitized incremental superstructure', reviews: 20, answers: 23, author: 'Violet Kores',
},
{
    id: 57, topic: 'Synchronised uniform open architecture', reviews: 8, answers: 48, author: 'Laetitia Baldrey',
},
{
    id: 58, topic: 'Profound clear-thinking definition', reviews: 12, answers: 25, author: 'Clair Hannan',
},
{
    id: 59, topic: 'Persevering exuding throughput', reviews: 88, answers: 7, author: 'Aldric Mongeot',
},
{
    id: 60, topic: 'Distributed analyzing parallelism', reviews: 91, answers: 13, author: 'Raimondo Bromfield',
},
{
    id: 61, topic: 'Operative interactive database', reviews: 2, answers: 73, author: 'Johanna Joskowicz',
},
{
    id: 62, topic: 'Fully-configurable contextually-based projection', reviews: 60, answers: 72, author: 'Hugues Sweeney',
},
{
    id: 63, topic: 'Open-architected multimedia Graphic Interface', reviews: 90, answers: 93, author: 'Maureene Rawstorn',
},
{
    id: 64, topic: 'Programmable national toolset', reviews: 89, answers: 70, author: 'Margy Bollard',
},
{
    id: 65, topic: 'Extended didactic neural-net', reviews: 25, answers: 63, author: 'Sibel Cissell',
},
{
    id: 66, topic: 'Upgradable demand-driven process improvement', reviews: 56, answers: 31, author: 'Sarena Haggus',
},
{
    id: 67, topic: 'Proactive stable function', reviews: 29, answers: 92, author: "Archaimbaud O'Tierney",
},
{
    id: 68, topic: 'Reduced upward-trending system engine', reviews: 33, answers: 50, author: 'Lonni Thunderchief',
},
{
    id: 69, topic: 'Focused mission-critical projection', reviews: 77, answers: 65, author: 'Gerardo Pimblott',
},
{
    id: 70, topic: 'Intuitive 24 hour encryption', reviews: 68, answers: 50, author: 'Saxe Thrussell',
},
{
    id: 71, topic: 'Open-architected static support', reviews: 24, answers: 82, author: 'Sarena Rate',
},
{
    id: 72, topic: 'Ergonomic local Graphical User Interface', reviews: 60, answers: 62, author: 'Ogdan Devenport',
},
{
    id: 73, topic: 'Configurable motivating ability', reviews: 31, answers: 20, author: 'Betti Stathor',
},
{
    id: 74, topic: 'Advanced disintermediate time-frame', reviews: 91, answers: 59, author: 'Katusha Behne',
},
{
    id: 75, topic: 'Diverse context-sensitive hub', reviews: 65, answers: 85, author: 'Cristin Pollett',
},
{
    id: 76, topic: 'Quality-focused human-resource monitoring', reviews: 63, answers: 79, author: 'Bo Beadell',
},
{
    id: 77, topic: 'Multi-lateral bi-directional time-frame', reviews: 18, answers: 16, author: 'Marthena Izaks',
},
{
    id: 78, topic: 'Customizable asymmetric pricing structure', reviews: 63, answers: 81, author: 'Alexandros McGrah',
},
{
    id: 79, topic: 'Diverse neutral open system', reviews: 10, answers: 62, author: 'Deanna Tristram',
},
{
    id: 80, topic: 'Innovative logistical service-desk', reviews: 16, answers: 34, author: 'Jordon Whittlesea',
},
{
    id: 81, topic: 'Innovative encompassing instruction set', reviews: 42, answers: 66, author: 'Kinnie Farnaby',
},
{
    id: 82, topic: 'Multi-channelled explicit software', reviews: 85, answers: 28, author: 'Aurlie Jannaway',
},
{
    id: 83, topic: 'Organized discrete collaboration', reviews: 67, answers: 19, author: 'Lolita Pergens',
},
{
    id: 84, topic: 'Quality-focused global algorithm', reviews: 96, answers: 29, author: 'Channa Hightown',
},
{
    id: 85, topic: 'Profit-focused explicit software', reviews: 90, answers: 3, author: 'George Titman',
},
{
    id: 86, topic: 'Object-based fresh-thinking challenge', reviews: 5, answers: 43, author: 'Niels Lavington',
},
{
    id: 87, topic: 'Reverse-engineered bandwidth-monitored neural-net', reviews: 18, answers: 30, author: 'Gardener Galvin',
},
{
    id: 88, topic: 'Grass-roots bottom-line migration', reviews: 11, answers: 31, author: 'Ashil Digweed',
},
{
    id: 89, topic: 'Profit-focused clear-thinking firmware', reviews: 65, answers: 38, author: 'Ronna Adlington',
},
{
    id: 90, topic: 'Adaptive empowering data-warehouse', reviews: 92, answers: 62, author: 'Sax Chiechio',
},
{
    id: 91, topic: 'Assimilated cohesive Graphic Interface', reviews: 5, answers: 61, author: 'Abeu Creegan',
},
{
    id: 92, topic: 'Multi-tiered multimedia access', reviews: 40, answers: 70, author: 'Mattias Matchett',
},
{
    id: 93, topic: 'Robust needs-based superstructure', reviews: 68, answers: 90, author: 'Sherry Blackden',
},
{
    id: 94, topic: 'Profit-focused transitional customer loyalty', reviews: 17, answers: 8, author: 'Barbara Kendred',
},
{
    id: 95, topic: 'Programmable systematic application', reviews: 55, answers: 48, author: 'Shannon Bownde',
},
{
    id: 96, topic: 'Polarised modular moderator', reviews: 17, answers: 46, author: 'Giselle Ianitti',
},
{
    id: 97, topic: 'Compatible next generation contingency', reviews: 32, answers: 28, author: 'Bridie Ditch',
},
{
    id: 98, topic: 'Exclusive clear-thinking model', reviews: 25, answers: 16, author: 'Leodora Tallach',
},
{
    id: 99, topic: 'Triple-buffered dynamic system engine', reviews: 87, answers: 98, author: 'Suzette Branigan',
},
{
    id: 100, topic: 'Polarised value-added system engine', reviews: 33, answers: 97, author: 'Jacki Corsor',
}];

const COMMENTS: ForumTopicCommentProps[] = [
    {
        id: 1, description: 'hey', date: '01.04.21', author: 'Pro.100.chel', parentId: 0,
    },
    {
        id: 5, description: 'hey', date: '01.04.21', author: 'Pro.100.chel', parentId: 1,
    },
    {
        id: 6, description: 'hey', date: '01.04.21', author: 'Pro.100.chel', parentId: 1,
    },
    {
        id: 7, description: 'hey', date: '01.04.21', author: 'Pro.100.chel', parentId: 1,
    },
    {
        id: 8, description: 'hey', date: '01.04.21', author: 'Pro.100.chel', parentId: 1,
    },
    {
        id: 9, description: 'hey', date: '01.04.21', author: 'Pro.100.chel', parentId: 8,
    },
    {
        id: 10, description: 'hey', date: '01.04.21', author: 'Pro.100.chel', parentId: 8,
    },
    {
        id: 2, description: 'hey', date: '01.04.21', author: 'Pro.100.chel', parentId: 0,
    },
];

export const COMMENTS_TREE: ForumTopicCommentProps[] = arrayToTree(
    COMMENTS, {
        parentProperty: 'parentId',
    },
);
