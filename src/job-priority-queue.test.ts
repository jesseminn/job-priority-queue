import { JobPriorityQueue } from './job-priority-queue';
import { wait } from './wait';

test('JobPriorityQueue', async () => {
    const appInitJobQueue = new JobPriorityQueue({ label: 'App init job queue', enableDebugger: true });
    const appResumeJobQueue = new JobPriorityQueue({ label: 'App resume job queue', enableDebugger: true });
    const normalJobQueue = new JobPriorityQueue({ label: 'Normal job queue', enableDebugger: true });

    // when app init

    appInitJobQueue.enqueueJob(async () => {
        console.log('app init job 1 start');
        await wait(5000);
        console.log('app init job 1 done');
    }, 1);

    appInitJobQueue.enqueueJob(async () => {
        console.log('app init job 2 start');
        await wait(3000);
        console.log('app init job 2 done');
    }, 1);

    await wait(3000);
    console.log('-------------- app did init -----------------');
    console.log('-------- app did resumed ---------');

    const metaJobQueue = new JobPriorityQueue();
});
