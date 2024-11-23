import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { About } from '../entities/about.entity';

export async function AboutUsSeeder(dataSource: DataSource) {
  const logger = new Logger('Seeder');

  logger.log(`Seeding aboutUs's data...`);
  const aboutUsRepository = dataSource.getRepository(About);
  const checkExisted = await aboutUsRepository.find();
  if (checkExisted.length > 0) {
    logger.log('About us is already existed');
  } else {
    const data = new About();
    data.content = `<p><span style="font-size: 18pt;"><strong>Welcome to Bookworm</strong></span></p>
   <p><span style="font-size: 14pt;">"Bookworm is an independent New York bookstore and language school with&nbsp;locations in Manhattan and Brooklyn. We specialize in travel books and language&nbsp;classes."</span></p>
   <p><span style="font-size: 18pt;"><strong>Our Story</strong></span></p>
   <p><span style="font-size: 14pt;">The name Bookworm was taken from the </span><span style="font-size: 14pt;">original name for New York International Airport, </span><span style="font-size: 14pt;">which was renamed JFK in December 1963.</span></p>
   <p><span style="font-size: 14pt;">Our Manhattan store has just moved to the </span><span style="font-size: 14pt;">West Village. Our new location is 170 7th </span><span style="font-size: 14pt;">Avenue South, at the corner of Perry Street. </span><span style="font-size: 14pt;">From March 2008 through May 2016, the store </span><span style="font-size: 14pt;">was located in the Flatiron District.</span></p>
   <p><span style="font-size: 18pt;"><strong>Our Vision</strong></span></p>
   <p><span style="font-size: 14pt;">One of the last travel bookstores in the country, </span><span style="font-size: 14pt;">our Manhattan store carries a range of </span><span style="font-size: 14pt;">guidebooks (all 10% off) to suit the needs and </span><span style="font-size: 14pt;">tastes of every traveler and budget.</span></p>
   <p><span style="font-size: 14pt;">We believe that a novel or travelogue can be </span><span style="font-size: 14pt;">just as valuable a key to a place as any </span><span style="font-size: 14pt;">guidebook, and our well-read, well-traveled staff </span><span style="font-size: 14pt;">is happy to make reading recommendations for </span><span style="font-size: 14pt;">any traveler, book lover, or gift giver.</span></p>`;

    await aboutUsRepository.save(data);
    logger.log('AboutUs seeded successfuly');
  }
}
