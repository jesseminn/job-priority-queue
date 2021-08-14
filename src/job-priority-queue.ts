import { EventEmitter } from 'event-emitter';

import { AsyncCallback } from './types';
import { isValidNumber } from './is-valid-number';

import { PriorityQueue } from './priority-queue';
import { Debugger } from './debugger';

// My definition:
// Job only run once
// Task can many times
export type Job = {
    todo: AsyncCallback;
    label?: string;
};

export type JobPriorityQueueOptions = {
    label?: string;
    enableDebugger?: boolean;
    // TODO:
    ignoreError?: boolean;
    interval?: number;
};

export class JobPriorityQueue {
    public readonly didClearedJobs = new EventEmitter();
    private readonly priorityQueue = new PriorityQueue<Job>();
    private readonly debugger: Debugger;

    private isStarted = false;
    private isDoingJob = false;

    constructor(options?: JobPriorityQueueOptions) {
        this.debugger = new Debugger({
            label: options && typeof options.label === 'string' ? options.label : 'UnknownJobPriorityQueue',
            enabled: options && typeof options.enableDebugger === 'string' ? options.enableDebugger : false,
        });
    }

    async enqueueJob(todo: AsyncCallback, priorityOrLabel?: number | string, label?: string) {
        const priority = isValidNumber(priorityOrLabel) ? priorityOrLabel : undefined;
        const _label =
            typeof label === 'string' ? label : typeof priorityOrLabel === 'string' ? priorityOrLabel : undefined;

        if (!this.isStarted || this.isDoingJob) {
            this.priorityQueue.enqueue({ todo, label: _label }, priority);
        } else {
            // is started and is not doing job, do the job immediately
            this.isDoingJob = true;
            await todo();
            // there might be some job enqueued while working on previous job
            // thus run doJobs here
            await this.doJobs();
        }
    }

    async start() {
        this.isStarted = true;
        await this.doJobs();
    }

    // pause clearing jobs.
    // If it's working on a job, it'll be paused after the job is done.
    pause() {
        this.isStarted = false;
    }

    /**
     * stop working on jobs and clear the queue
     */
    stop() {
        this.pause();
        this.priorityQueue.clear();
    }

    private async doJobs() {
        this.isDoingJob = true;
        let job = this.priorityQueue.dequeue();

        while (job) {
            const {
                payload: { todo, label },
            } = job;
            if (typeof label === 'string') {
                this.debugger.debug(`${label} start`);
            }
            await todo();
            if (typeof label === 'string') {
                this.debugger.debug(`${label} end`);
            }
            // After done a job, check isStarted
            // if false, break to while loop
            if (!this.isStarted) {
                this.isDoingJob = false;
                break;
            }
            job = this.priorityQueue.dequeue();
        }
        this.isDoingJob = false;

        if (this.priorityQueue.isEmpty()) {
            this.didClearedJobs.emit();
        }
    }
}
