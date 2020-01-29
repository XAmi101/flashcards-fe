import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { postDecks } from '../../actions';
import './DeckForm.scss';
import TextField from '@material-ui/core/TextField';
import Tags from './Tags';
import poly from '../../assets/poly.png';
import { withStyles } from '@material-ui/core/styles';

const OrangeInput = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'rgba(106, 92, 85, 0.5)'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgba(106, 92, 85, 0.5)'
    }
  }
})(TextField);

const DeckForm = props => {
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('');
  const [tags, setTags] = useState([]);
  const [newDecks, setNewDecks] = useState([{ front: '', back: '' }]);
  // const [currentCard, setCurrentCard] = useState(0)

  const handleChanges = (index, event) => {
    const values = [...newDecks];

    if (event.target.name === 'front') {
      values[index].front = event.target.value;
    } else {
      values[index].back = event.target.value;
    }

    setNewDecks(values);
  };

  const handleName = e => {
    let name = e.target.name;

    setNewName({
      ...newName,
      [name]: e.target.value
    });
    console.log(newName);
  };

  const handleIcon = e => {
    let name = e.target.name;
    setNewIcon(e.target.value);
  };

  const handleAdd = () => {
    const values = [...newDecks];
    values.unshift({ front: '', back: '' });
    setNewDecks(values);
  };

  const handleRemove = index => {
    const values = [...newDecks];
    values.splice(index, 1);
    setNewDecks(values);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let dArr = [];
    
    newDecks.map(item => {
      if(!item.front || !item.back || !newName.deckName){
        alert('please fill in all cards and information')
      } else {
        dArr.push(item)
      }
    })
    if(dArr.length === newDecks.length){
      props.postDecks(newDecks, newName, tags, newIcon);
      props.history.push(`/dashboard`);
    }
  };

  const addTags = event => {
    event.preventDefault();
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      // selectedTags([...tags, event.target.value]);
      event.target.value = '';
    }
    console.log(tags);
  };

  const removeTags = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    console.log(tags);
  };

  // const selectedTags  =  {tags}

  return (
    <div>
      <div className='loading-background'>
        <img
          className='back'
          src={poly}
          alt='back arrow'
          onClick={() => props.history.goBack()}
        />
        <h1 className='deckName'>Create New Deck</h1>

        {/* <div className = "rightside"> */}
        <div className='number'>
          <h3 className='smile'>{newDecks.length}</h3>
        </div>
        <h4 className='mastered'>Total Cards</h4>
        {/* </div> */}
      </div>

      <div>
        <div className='page'>
          <div className='form'>
            <form className='cardForm'>
              <h3 className='deckInfo'>Deck Info</h3>

              <div className='inputHolders'>
                <OrangeInput
                  label='Deck Name'
                  type='text'
                  onChange={handleName}
                  name='deckName'
                  // placeholder = "Deck Name"
                />

                <div className='iconHolder'>
                  <OrangeInput
                    label='Icon'
                    className='iconField'
                    type='text'
                    onChange={handleIcon}
                    name='icon'
                  />
                </div>
              </div>

              <div className='tagHolder'>
                <Tags tags={tags} addTags={addTags} removeTags={removeTags} />
              </div>

              <h3 className='flashcards'>Flashcards</h3>

              <h3 className='new'>New Card</h3>

              {newDecks.forEach((newDeck, index) => (
                <Fragment key={`${newDeck}~${index}`}>
                  <div className='topCard'>
                    <label htmlFor='front' className='frontLabel'>
                      Front
                    </label>
                    <textarea
                      className='frontCard'
                      type='text'
                      onChange={event => handleChanges(index, event)}
                      name='front'
                      placeholder='Term'
                      value={newDeck.front}
                      multiline={true}
                    />

                    <div className='backHolder'>
                      <label htmlFor='back' className='backLabel'>
                        Back
                      </label>
                      <textarea
                        className='backCard'
                        type='text'
                        onChange={event => handleChanges(index, event)}
                        name='back'
                        value={newDeck.back}
                        placeholder='Definition'
                      />
                    </div>

                    <button type='button' onClick={() => handleRemove(index)}>
                      X
                    </button>
                  </div>

                  {/* <button
                type = "button"
                onClick = {() => handleAdd()}>
                    Add Card
                </button> */}
                </Fragment>
              ))}
            </form>
          </div>
          <div className='buttonHolder'>
            <button type='button' className='add' onClick={() => handleAdd()}>
              Add Card
            </button>

            <button
              className='save'
              // onSubmit = {handleSubmit}
              // onClick = {() => props.history.push(`/decklist`)}
              onClick={handleSubmit}
            >
              Save Deck
            </button>
          </div>

          <form onSubmit={handleSubmit} className='cardFormBottom'>
            {newDecks.map((newDeck, index) => (
              <div key={`${newDeck}~${index}`}>
                <div className='card'>
                  <div className='removeHolder'>
                    <button
                      type='button'
                      className='remove'
                      onClick={() => handleRemove(index)}
                    >
                      X
                    </button>
                  </div>

                  <label htmlFor='front' className='frontLabel'>
                    Front
                  </label>
                  <textarea
                    className='frontCard'
                    type='text'
                    onChange={event => handleChanges(index, event)}
                    name='front'
                    // placeholder = "Term"
                    value={newDeck.front}
                  />

                  <div className='backHolder'>
                    <label htmlFor='back' className='backLabel'>
                      Back
                    </label>
                    <textarea
                      className='backCard'
                      type='text'
                      onChange={event => handleChanges(index, event)}
                      name='back'
                      value={newDeck.back}
                      // placeholder = "Definition"
                    />
                  </div>
                </div>

                {/* <button
                            type = "button"
                            onClick = {() => handleAdd()}>
                                Add Card
                            </button> */}
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { postDecks })(DeckForm);