sample = 1;
let sample = 2;

var red_long_sleeve_basketball_shirt = 49.50;

if(SuperLongCondition1 && SuperLongCondition2 && SuperLongCondition3 && SuperLongCondition4 && SuperLongCondition5 && SuperLongCondition6 && SuperLongCondition7 && SuperLongCondition8) 
{
	counter = 0;
}

calc.add(3).subtract(2).multiply(6).divide(5).add(1).print();

const expr = 'Papayas';
switch (expr) {
    case 'Oranges':
        console.log('Oranges are $0.59 a pound.');
        break;
    default:
        console.log(`Sorry, we are out of ${expr}.`);
}

function name(par1, par2, par3, par4, par5, par6) { return 2; }

(par1, par2, par3, par4, par5) => { return 2;}

function start(x) {
	var tmp = 20;
	function foo(y) {
		++tmp;
		function mid(z) {
			tmp -= 10;
			function end(q) {
				document.write(x + y + z + q + tmp);
			}
			end(1);
		}
		mid(3);
	}
	foo(10);
}
start(2);

function showChapter(chapter, tutorial) {
    if(chapter.orderIndex == 1) {
        this.redirectToRoot()
    }

    let higherChapters = chapter.items.filter(item => item.higher)
    let lowerTutorials = chapter.items.filter(item => !item.higher)

    let title = chapter.title
    let description = chapter.description

    if(chapter.lowerItem) {
        this.nextPath = this.getChapterPath(this.tutorial, chapter.lowerItem)
        this.nextLink = this.nextPath
    } else if(!!tutorial.pathId && !!lowerTutorials) {
        this.nextPath = this.getTutorialPath(lowerTutorials[0])
        this.nextLink = this.nextPath
    } else if (chapter.last && !tutorial.footLinks.length > 0) {
        this.nextPath = tutorial.footLinks.url
    }

    if(higherChapters.length === 0) {
        this.prevLink = this.getChapterPath(tutorial, higherChapters)
    } else if (!!tutorial.pathId && tutorial.higherItem) {
        let higherTutorial = tutorial.higherItem
        lastChapter = higherTutorial.chapters[higherTutorial.chapters.length-1]

        if (lastChapter.orderIndex == 1) {
            this.prevLink = this.getTutorialPath(higherTutorial)
        } else {
            this.prevLink = this.getChapterPath(higherTutorial, higherChapters)
        }
    }

    this.storeProps = { 
        checkableType: 'Chapter',
        checkableId: chapter.id,
        checkboxes: this.signedIn ? currentUser.getCheckboxesFor(chapter) : [] 
    }

    this.setStore()

    this.modal = this.getModalChapter(chapter) || this.getModalTutorial(tutorial)
}