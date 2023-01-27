import { useState, useEffect } from "react";
import Head from "next/head";
import { GithubIcon } from "components/icons/GithubIcon";
import { vanaApiPost } from "vanaApi";
import { LoginHandler } from "components/auth/LoginHandler";


import { motion } from 'framer-motion';

export default function Home() {
  // User State
  const [user, setUser] = useState({
    balance: 0,
    exhibits: [],
    textToImage: [],
  });

  // Text-to-Image State
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [feeling, setFeeling] = useState("");
  const [adj1, setAdj1] = useState("");
  const [adj2, setAdj2] = useState("");
  const [adj3, setAdj3] = useState("");
  const [color, setColor] = useState("");
  const [style, setStyle] = useState("");
  const [location, setLocation] = useState("");



  const callTextToImageAPI = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await vanaApiPost(`jobs/text-to-image`, {
      // await vanaApiPost(`images/generations`, {
        prompt: "A " + adj1 + ", " + adj2 + ", " + adj3 + " version of {target_token} feeling " + feeling + " in " + location + " depicted in a " + color + " " + style + " style",
        // prompt: prompt.replace(/\bme\b/i, "{target_token}"), // Replace the word "me" with "{target_token}" in the prompt to include yourself in the picture
        exhibit_name: "text-to-image", // How your images are grouped in your gallery. For this demo, all images will be grouped in the `text-to-image` exhibit
        n_samples: 5,
        seed: -1, // The inference seed: A non-negative integer fixes inference so inference on the same (model, prompt) produces the same output
      });
      alert(
        "Successfully submitted prompt. New images will appear in about 7 minutes."
      );
    } catch (error) {
      setErrorMessage("An error occurred while generating the image");
    }

    setIsLoading(false);714940
  };

  return (
    <>
      <Head>
        <title>Vana MIT Hackathon</title>
        <meta name="description" content="Vana MIT Hackathon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.0/anime.min.js"></script>

      </Head>
      <header className="header">
        <a
          href="https://github.com/vana-com/vana-mit-hackathon"
          target="_blank"
        >
          <GithubIcon />
        </a>
      </header>
      <main className="main">
        <LoginHandler setUser={setUser}>
          {user.exhibits.length > 0 && (
            <div className="content container">
              <div className="space-y-4">

                <motion.div initial="hidden" animate="visible" variants={{
                    hidden: {
                      scale: .8,
                      opacity: 0
                    },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        delay: .8
                      }
                    },
                  }} whileHover={{
                    scale: 1.2,
                    transition: {
                      duration: .2
                    }
                  }}>
                  <h1>Vana Personalities</h1> 
                </motion.div>

                <script src="script.js"></script>

                {/* <label htmlFor="prompt-input">Prompt:</label> */}
                <form onSubmit={callTextToImageAPI}>
                <div id='questions' style={{display: "block"}}>

                  <div id='qui'>
                  <label for="first">First name:</label>
                  <input type="text" id="first" name="first" />

                  <label for="last">Last name:</label>
                  <input type="text" id="last" name="last" />
                  </div>

                  <label for="feeling">In one adjective, how are you feeling today?</label>
                  <input type="text" id="feeling" name="feeling" 
                    value={feeling}
                    onChange={(event) => setFeeling(event.target.value)}
                  />

                  <p>Do you prefer spending time exploring new interests, or refining your current interests?</p>
                  <input type="radio" id="int1" name="int" value="explorative"/>
                  <label for="int1">Explore</label>
                  <input type="radio" id="int2" name="int" value="refined"/>
                  <label for="int2">Refine</label>

                  <p>Do you prefer to be in fast-paced or calm environments?</p>
                  <input type="radio" id="speed1" name="speed" value="focused"/>
                  <label for="speed1">Fast-paced</label>
                  <input type="radio" id="speed2" name="speed" value="calm"/>
                  <label for="speed2">Calm</label>

                  <p>Do you tend to think out loud, or to think to yourself?</p>
                  <input type="radio" id="ext1" name="ext" value="extroverted"/>
                  <label for="ext1">Think out loud</label>
                  <input type="radio" id="ext2" name="ext" value="introverted"/>
                  <label for="ext2">Think to myself</label>


                  <p>Describe yourself in three adjectives.</p>
                  <label for="adj1"></label>
                  <input type="text" id="adj1" name="adj1" 
                                      value={adj1}
                                      onChange={(event) => setAdj1(event.target.value)}
                  />
                  <br/>

                  <label for="adj2"></label>
                  <input type="text" id="adj2" name="adj2" 
                                      value={adj2}
                                      onChange={(event) => setAdj2(event.target.value)}
                  />
                  <br/>

                  <label for="adj3"></label>
                  <input type="text" id="adj3" name="adj3" 
                                      value={adj3}
                                      onChange={(event) => setAdj3(event.target.value)}
                  />

                  <label for="color">What's your favorite color?</label>
                  <input type="text" id="color" name="color" 
                                      value={color}
                                      onChange={(event) => setColor(event.target.value)}                  
                  />

                  <label for="style">What's your favorite art style? (ex. futuristic, medieval, realistic, etc.) </label>
                  <input type="text" id="style" name="style" 
                                      value={style}
                                      onChange={(event) => setStyle(event.target.value)}                  
                  />

                  <label for="location">What's your favorite place? Be as creative as you like!</label>
                  <input type="text" id="location" name="location" 
                                      value={location}
                                      onChange={(event) => setLocation(event.target.value)}
                  />

                  {/* <input hidden
                    id="prompt-input"
                    type="text"
                    placeholder="Me eating blue spaghetti"
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)}
                  /> */}
                  <div class="wrapper"><button type="submit">Generate images</button></div>
                  
                  </div>

                </form>
                {/* <div>Credit balance: {user?.balance ?? 0}</div>

                {isLoading && <p>Loading...</p>}
                {errorMessage && <p>Error: {errorMessage}</p>}

                <div>
                  <p>
                    Tip: make sure to include the word "me" in your prompt to
                    include your face
                  </p>
                </div> */}
              </div>

              {/** Show the images a user has created */}
              <div className="pt-1 space-y-4">
                {user?.textToImage?.map((image, i) => (
                  <img src={image} key={i} className="w-full" />
                ))}
              </div>
            </div>
          )}

          {/* User doesn't have a trained model*/}
          {user.exhibits.length === 0 && (
            <p>
              Unfortunately, you haven't created a personalized Vana Portrait
              model yet. Go to https://portrait.vana.com/create to create one 🙂
            </p>
          )}
        </LoginHandler>
      </main>
    </>
  );
}
