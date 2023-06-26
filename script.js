const addButton = document.querySelector('#add');

upadateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note)=>{
     return notes.push(note.value)
    });

    localStorage.setItem('notes', JSON.stringify(notes))
}

const addNewNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>

       <div class="main ${text ? '' : 'hidden'}"></div>
       <textarea class=" ${text ? 'hidden' : ''}"></textarea>`;

    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(note)

    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //  deleting note
    delButton.addEventListener('click', () =>{
        note.remove();
    });

    // toggle using edit button
      textArea.value = text;
      mainDiv.innerHtml = text;

     editButton.addEventListener('click', () =>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
     });

     textArea.addEventListener('change', (event)=>{
        const value = event.target.value;
        mainDiv.innerHtml = value;

        upadateLSData();
     })


    document.body.appendChild(note)

}

// getting data from local storage

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){notes.forEach((note) => addNewNote())};

addButton.addEventListener('click', () => addNewNote());