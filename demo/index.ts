import { JobPriorityQueue } from 'job-priority-queue';

const jobQueue = new JobPriorityQueue();

export const wait = async (duration: number) =>
    new Promise(resolve => {
        setTimeout(resolve, duration);
    });

jobQueue.enqueueJob(async () => {
    console.log('0 start');
    await wait(1000);
    console.log('0 done');
}, 0);
// enqueue a job with priority which aready exists
// append to the existing one
jobQueue.enqueueJob(async () => {
    console.log('0-2 start');
    await wait(1000);
    console.log('0-2 done');
}, 0);
// enqueue job with no priority,
// the job will be append at the end of the queue
jobQueue.enqueueJob(async () => {
    console.log('job without priority');
    await wait(1000);
    console.log('job without priority done');
});
jobQueue.enqueueJob(async () => {
    console.log('job without priority 2');
    await wait(1000);
    console.log('job without priority 2 done');
});
jobQueue.enqueueJob(async () => {
    console.log('1 start');
    await wait(1000);
    console.log('1 done');
}, 1);

// start clearning jobs
jobQueue.start();
// after started, enqueue three jobs, run jobs automatically
jobQueue.didClearedJobs.once(async () => {
    jobQueue.enqueueJob(async () => {
        console.log('taks after started 1');
        await wait(3000);
        console.log('taks after started 1 done');
    });

    jobQueue.pause();
    console.log('job queue paused');

    jobQueue.enqueueJob(async () => {
        console.log('taks after started 2');
        await wait(1000);
        console.log('taks after started 2 done');
    });

    await wait(3000);
    console.log('job queue restart');
    jobQueue.start();
});
