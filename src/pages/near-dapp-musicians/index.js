import { useState, useEffect, useContext } from 'react';

import { NearContext } from '@/wallets/near';
import styles from '@/styles/app.module.css';
import { HelloNearContract } from '../../config';
import { Cards } from '@/components/cards';
import Header from '../../components/near-dapp-musicians/js/Header.js';
import SongList from '../../components/near-dapp-musicians/js/SongList.js';
import AddSong from '../../components/near-dapp-musicians/js/AddSong';

// Contract that the app will interact with
//const CONTRACT = HelloNearContract;
const CONTRACT = 'dev-1658968177124-13082461676051';


export default function HelloNear() {
  const { signedAccountId, wallet } = useContext(NearContext);

  const [greeting, setGreeting] = useState('loading...');
  const [newGreeting, setNewGreeting] = useState('loading...');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [songCatalog, setSongCatalog] = useState([]);


  useEffect(() => {
    if (!wallet) return;

    wallet.viewMethod({ contractId: CONTRACT, method: 'get_song_catalog' }).then(
      song_catalog => /* setGreeting(song_catalog) */ { console.log(song_catalog); setSongCatalog(song_catalog); }
    );
  }, [wallet]);

  useEffect(() => {
    setLoggedIn(!!signedAccountId);
  }, [signedAccountId]);

  const saveGreeting = async () => {
    setShowSpinner(true);
    await wallet.callMethod({ contractId: CONTRACT, method: 'set_greeting', args: { greeting: newGreeting } });
    const greeting = await wallet.viewMethod({ contractId: CONTRACT, method: 'get_greeting' });
    setGreeting(greeting);
    setShowSpinner(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Musician dApp Interacting with the contract: &nbsp;
          <code className={styles.code}>{CONTRACT}</code>
        </p>
      </div>

      <div className={styles.center}>

        <div className="w-100 text-end align-text-center" hidden={loggedIn}>
          <p className="m-0"> Please login </p>
        </div>
      </div>

      {/*   <Header /> */}
      {/*         <AddSong add_song_info={add_song_info} get_song_catalog={get_song_catalog} addSongInfo={addSongInfo} />
 */}        <hr />
      <SongList song_catalog={songCatalog} />

    </main>
  );
}