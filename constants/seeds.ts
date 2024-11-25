import prepareSoil from '@/assets/simulation/prepare-soil.json';
import sowSeed from '@/assets/simulation/sow-seed.json';
import watering from '@/assets/simulation/watering.json';
import germination from '@/assets/simulation/germination.json';
import transplant from '@/assets/simulation/transplant.json';
import addSupport from '@/assets/simulation/add-support.json';
import fertilization from '@/assets/simulation/fertilization.json';
import flowering from '@/assets/simulation/flowering.json';
import fruitDevelopment from '@/assets/simulation/fruit-development.json';
import harvest from '@/assets/simulation/harvest.json';

export const seeds = ['🌱', '🌱', '🌱', '🌱', '🌱', '🌱', '🌱', '🌱', '🌱', '🌱', '🌱', '🌱', '🌱', '🌱', '🌱'];

export const steps = [
  {
    day: 1,
    stage: "Preparing the Soil",
    tasks: `Clear the courtyard space of any debris, weeds, or stones.
Loosen the soil using a trowel or spade to improve aeration and drainage.
Mix organic compost or well-rotted manure into the soil to enrich it with nutrients.`,
    animation: prepareSoil,
    precautions: `Wear gloves to avoid injuries or exposure to soil-borne organisms.
Avoid over-tilling as it may damage the soil structure.`,
    tools: ["Trowel", "Spade", "Gloves", "Compost"],
    expectedOutcome: `The soil is clean, aerated, and nutrient-rich, ready for planting.`,
  },
  {
    day: 2,
    stage: "Selecting Seeds and Sowing",
    tasks: `Choose a variety of tomato seeds suitable for small spaces (e.g., cherry tomatoes or determinate varieties).
Soak the seeds in water for 4-6 hours to improve germination.
Plant seeds in seed trays or directly in pots, about 0.5 cm deep. Cover lightly with soil.`,
    animation: sowSeed,
    precautions: `Ensure seeds are not expired or damaged. Use clean trays or pots to prevent contamination.`,
    tools: ["Seed trays", "Water container", "Soil"],
    expectedOutcome: `Seeds are sown properly and are set to germinate.`,
  },
  {
    day: 3,
    stage: "Watering and Monitoring",
    tasks: `Water the soil gently to keep it consistently moist.
Place the pots or trays in a sunny spot where they get at least 6-8 hours of sunlight daily.
Monitor for any signs of pests or diseases.`,
    animation: watering,
    precautions: `Avoid overwatering to prevent root rot. Use clean water and monitor for standing water.`,
    tools: ["Watering can", "Sunlight"],
    expectedOutcome: `Soil remains moist, and seedlings receive adequate sunlight.`,
  },
  {
    day: 6,
    stage: "Germination Phase",
    tasks: `Look for sprouts appearing from the soil (typically around Day 7).
Continue watering lightly and ensure adequate sunlight.`,
    animation: germination,
    precautions: `Handle sprouts gently as they are delicate. Avoid letting the soil dry out.`,
    tools: ["Spray bottle", "Sunlit area"],
    expectedOutcome: `Healthy sprouts appear, indicating successful germination.`,
  },
  {
    day: 11,
    stage: "Transplanting Seedlings",
    tasks: `Once the seedlings have 2-3 sets of true leaves, transplant them into larger pots or directly into the courtyard soil.
Space the plants about 18-24 inches apart to allow proper growth.`,
    animation: transplant,
    precautions: `Handle roots carefully to avoid damage. Transplant in the late afternoon to minimize stress.`,
    tools: ["Trowel", "Larger pots"],
    expectedOutcome: `Seedlings are safely transplanted with sufficient spacing.`,
  },
  {
    day: 16,
    stage: "Adding Support",
    tasks: `Install stakes, cages, or trellises near each plant to support the vines as they grow.
Tie the stems gently to the support using soft ties.`,
    animation: addSupport,
    precautions: `Ensure ties are not too tight to avoid damaging stems. Use sturdy support structures.`,
    tools: ["Stakes", "Cages", "Soft ties"],
    expectedOutcome: `Plants are well-supported to grow upright and prevent breaking.`,
  },
  {
    day: 21,
    stage: "Fertilizing and Pruning",
    tasks: `Apply a balanced fertilizer every 10-14 days to encourage growth.
Begin pruning suckers (small shoots that grow between the main stem and branches) to promote better airflow and fruiting.`,
    animation: fertilization,
    precautions: `Avoid over-fertilizing to prevent burning the roots. Sterilize pruning tools to avoid spreading diseases.`,
    tools: ["Fertilizer", "Pruning shears"],
    expectedOutcome: `Plants grow healthier with better airflow and nutrition.`,
  },
  {
    day: 31,
    stage: "Flowering Stage",
    tasks: `Watch for small yellow flowers, signaling the beginning of fruit production.
Ensure plants are watered regularly, especially during dry periods.
Pollinate flowers manually (if needed) by gently shaking the plant or using a soft brush to transfer pollen.`,
    animation: flowering,
    precautions: `Avoid disturbing flowers unnecessarily. Maintain even watering to prevent stress.`,
    tools: ["Soft brush"],
    expectedOutcome: `Plants begin flowering, setting the stage for fruit production.`,
  },
  {
    day: 51,
    stage: "Fruit Development",
    tasks: `Monitor the plants for green tomatoes forming after flowers drop.
Provide additional potassium-rich fertilizer to enhance fruit quality.
Check for pests like aphids or caterpillars and treat them organically if needed.`,
    animation: fruitDevelopment,
    precautions: `Inspect for pests daily. Avoid using harmful pesticides on fruiting plants.`,
    tools: ["Potassium fertilizer", "Magnifying glass"],
    expectedOutcome: `Fruits begin developing, and plants remain healthy.`,
  },
  {
    day: 71,
    stage: "Harvesting",
    tasks: `Pick ripe tomatoes when they turn red (or yellow, depending on the variety).
Use scissors or pruning shears to avoid damaging the plant.
Harvest regularly to encourage more fruit production.`,
    animation: harvest,
    precautions: `Harvest gently to avoid damaging the plant. Store tomatoes in a cool, dry place.`,
    tools: ["Pruning shears", "Basket"],
    expectedOutcome: `Ripe, healthy tomatoes are harvested, and plants continue to produce.`,
  },
];

