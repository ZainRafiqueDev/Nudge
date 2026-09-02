/**
 * Curated, verified Unsplash photo ids used throughout the demo. Every id below
 * was checked to resolve before being added here (see plan verification step).
 */
function unsplash(id: string, w: number, h?: number) {
  const size = h ? `w=${w}&h=${h}&fit=crop` : `w=${w}`
  return `https://images.unsplash.com/photo-${id}?${size}&q=80&auto=format`
}

export const portraitId = {
  aisha: "1573496359142-b8d87734a5a2",
  daniel: "1519085360753-af0119f7cbe7",
  priya: "1580489944761-15a19d654956",
  marcus: "1500648767791-00dcc994a43e",
  lena: "1544005313-94ddf0286df2",
  omar: "1502685104226-ee32379fefbe",
  grace: "1438761681033-6461ffad8d80",
  felix: "1487412720507-e7ab37603c6f",
  sofia: "1541823709867-1b206113eafd",
  ravi: "1607990281513-2c110a25bd8c",
  noah: "1489980557514-251d61e3eeb6",
  hannah: "1524504388940-b1c1722653e1",
  tomas: "1552058544-f2b08422138a",
  ines: "1554151228-14d9def656e4",
  zara: "1633332755192-727a05c4013d",
  leon: "1618077360395-f3068be8e001",
  yusuf: "1531123897727-8f129e1688ce",
  clara: "1521510895919-46920266ddb3",
  ethan: "1517841905240-472988babdf9",
  maya: "1560250097-0b93528c311a",
} as const

export type PortraitKey = keyof typeof portraitId

export function portrait(key: PortraitKey, size = 160) {
  return unsplash(portraitId[key], size, size)
}

export const sceneId = {
  teamMeeting: "1522202176988-66273c2fd55f",
  teamCollaborating: "1552664730-d307ca884978",
  modernOffice: "1600880292203-757bb62b4baf",
  laptopMeeting: "1521737604893-d14cc237f11d",
  standupMeeting: "1531973576160-7125cd663d86",
  deskAnalytics: "1556761175-5973dc0f32e7",
  officeTeam: "1573164713988-8665fc963095",
  workspaceLaptop: "1542744173-8e7e53415bb0",
  teamDiscussion: "1519389950473-47ba0277781c",
  chartsOnLaptop: "1553877522-43269d4ea984",
  graphAnalytics: "1460925895917-afdab827c52f",
  openWorkspace: "1504868584819-f8e8b4b6d7e3",
  officeBuilding: "1497215728101-856f4ea42174",
  salesCall: "1571171637578-41bc2dd41cd2",
  officeMeeting: "1600880292089-90a7e086ee0c",
} as const

export type SceneKey = keyof typeof sceneId

export function scene(key: SceneKey, w = 1200, h?: number) {
  return unsplash(sceneId[key], w, h)
}
