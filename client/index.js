const MoodContractAddress = '0xCBa287caCA8f92803d880b0178262E82c95D74BB'
const MoodContractABI = [
  {
    inputs: [],
    name: 'getMood',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_mood',
        type: 'string',
      },
    ],
    name: 'setMood',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
const provider = new ethers.providers.Web3Provider(window.ethereum, 'goerli')

provider.send('eth_requestAccounts', []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0])
    MoodContract = new ethers.Contract(
      MoodContractAddress,
      MoodContractABI,
      signer
    )
  })
})

async function getMood() {
  const getMoodPromise = MoodContract.getMood()
  const Mood = await getMoodPromise
  console.log(Mood)
  document.getElementById('moodvalue').innerHTML = `Your Mood <br /> ${Mood}`
}

async function setMood() {
  const mood = document.getElementById('mood').value
  const setMoodPromise = MoodContract.setMood(mood)
  await setMoodPromise
  document.getElementById(
    'moodvalue'
  ).innerHTML = `You have set the mood to ${mood}`
}
